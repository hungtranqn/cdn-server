import ImageEditor from "#commons/utils/imageeditor.js";
import ParseImageUrl from "#commons/utils/parseimageurl.js";
import mediacachemodel from '#models/mediacache.js';
import MediaContents from '#models/mediacontents.js';
import BaseController from 'suu/controller';

import {CONTROLLER_DIRECTORY} from "./init.js";

const debug = suu.createDebug('suu:loadimages:loadimagecontroller');
const MEDIA_CACHEABLE = suu.app.get('media_cacheable');
const file404location = suu.path.join(suu.__dirpublic, 'images', 'nophoto.png');

const cache404page = suu.createCache('image404');

/**
 * Features
 * @param {suu.features.FeatureSet}
 */
let loadcontentfeatures;

/**
 * Set features
 * @return {Promise<suu.features.FeatureSet>}
 */
async function setupLoadSourceFeatures(){
    debug('Setup load source features');
    loadcontentfeatures = await suu.features.imports(CONTROLLER_DIRECTORY, 'features', 'loadimages');
    suu.emit('loadimages:setup:features', loadcontentfeatures);
    return loadcontentfeatures;
}

//Path routes
export const PATH_ROUTES = [
    '/:ext?/imgs?/*',
    '/:ext?/sg/*'
];

/**
 * Load image controller
 */
export default class LoadImageController extends BaseController{
    
    /**
     * Is initialized
     * @type {boolean}
     */
    isInitialized = false;
    
    /**
     * Image Parser
     * @type {ParseImageUrl}
     */
    image = null;
    
    /**
     * Load image url
     * @type {null}
     */
    url = null;
    
    /**
     * Image cached
     * @type {Mediacache}
     */
    cacheditem = null;
    
    /**
     * Image Id
     * @param req
     * @param res
     * @param next
     */
    
    constructor(req, res, next){
        super(req, res, next);
    }
    async getTest(){
        const data = await MediaContents.find({}).limit(10).exec();
        this.sendSuccess(data);
    }
    /**
     * Init
     * @return {Promise<void>}
     */
    async init(){
        if(this.isInitialized){
            return;
        }
        
        this.isInitialized = true;
        
        //Import features
        if(!loadcontentfeatures){
            loadcontentfeatures = await setupLoadSourceFeatures();
        }
    }
    
    /**
     * Dispatch request
     * @return {Promise<void>}
     */
    async loadimageAction(){
        try{
            if(!this.isInitialized){
                await this.init();
            }
            
            // if(debug.enabled){
            //     debug("Load image from url", this.req.requesturl);
            // }
            
            //Dispatch load image request
            this.image = this.req.image;
            if(!this.image){
                await this.parseQuery(this.req.requesturl);
            }
            
            // Check cache 404 pages
            if(await cache404page.get(this.image.sourceid)){
                // if(debug.enabled){
                //     debug("request from cache 404 image", this.image.sourceid);
                // }
                return await this.send404error();
            }
            
            //Load cached
            let contents = await this.processImage();
            if(contents){
                this.sendMedia(contents);
            }
        }catch(e){
            if(!suu.isInvalidArgumentError(e)){
                suu.log_error(e);
            }
            
            await this.send404error();
        }finally{
            //Free memory
            delete this.imageeditor;
        }
    }
    
    /**
     * Save media to cache
     */
    async saveMediaCache(buffer){
        if(!MEDIA_CACHEABLE){
            return this;
        }
        
        debug('Save media cache');
        mediacachemodel.addCache(this.req.queryid, {
            data: buffer,
            filetype: this.extension,
            filesize: buffer.length,
            queryurl: this.image.url,
            urlpath: this.image.urlpath,
            imageid: this.image.sourceid
        });
        
        return this;
    }
    
    /**
     * Load url
     */
    async loadUrl(url){
        //Parse query
        await this.parseQuery(url);
        
        //Process image
        return await this.processImage();
    }
    
    /**
     * Parse query first
     * @return {Promise<void>}
     */
    async parseQuery(url){
        //Parse query
        this.image = new ParseImageUrl(url);
        await this.image.parse();
        
        //Vaildate image url
        if(!this.image.sourceurl){
            throw suu.invalidArgument('Invalid image url');
        }
    }
    
    /**
     * Process image request
     * @return {Promise<Buffer>}
     */
    async processImage(){
        
        // if(debug.enabled){
        //     debug("Process image", {sourceurl: this.image.sourceurl, url: this.image.url});
        // }
        
        //Get source contents
        let imagecontents = await this.getSourceContents();
        //Check image editor
        if(!this.imageeditor){
            this.imageeditor = new ImageEditor(imagecontents);
        }
        
        //Parse data to image editor
        Object.assign(this.imageeditor, this.image);
        
        //Process image
        await this.imageeditor.process();
        
        //Set mimetype
        this.extension = this.imageeditor.extension;
        this.mimetype = this.image.mimetype;
        
        //Return buffer
        return await this.imageeditor.getBuffer();
    }
    
    /**
     * get source contents
     * @return {Promise<Buffer>}
     */
    async getSourceContents(){
        //Get Source contents
        let sourcedata  = await loadcontentfeatures.getIfResult('getsourcecontents', this.image);
        if(!sourcedata){
            throw suu.invalidArgument('Invalid source data');
        }
        
        //trigger after source contents
        this.image.beginloadsourcetime = Date.now();
        
        //Trigger after source contents
        loadcontentfeatures.applyParallel('aftergetsourcecontents', this.image, sourcedata).then(() => {
            this.image.endloadsourcetime = Date.now();
            
            //Trigger load source complete
            suu.emit('loadimages:loadsource:complete', this.image, sourcedata);
        });
        
        return sourcedata;
    }
    
    /**
     * Send media to client
     * @param data
     */
    async sendMedia(data){
        //Send media
        // console.log('sendMedia',this.extension || this.image.extension);
        this.setContentType(this.extension || this.image.extension);
        this.setHeaderCaches();
        this.send(data);
        return this;
    }
    
    /**
     * Send 404 error
     * @return {Promise<void>}
     */
    async send404error(){
        
        if(debug.enabled){
            debug("Send 404 error", this.image.sourceid);
        }
        
        //cache 404 error
        cache404page.set(this.image.sourceid, true);
        
        this.res.status(404)
            .setHeader('Content-Type', 'image/png')
            .setHeaderNoCache()
            .send(suu.fs.readFileSync(file404location));
    }
    
}