import Baseimage from "#commons/utils/abstracts/baseimage.js";
import sharp from 'sharp';

const debug = suu.createDebug('suu:imageeditor');

//Settings images sizes
let listimagesizes;

/**
 * ImageEditor
 */
class ImageEditor extends Baseimage{
    
    /**
     * Sharp instance
     * @type {sharp.Sharp}
     */
    sharp = null;
    
    /**
     * Source data
     * @type {Buffer}
     */
    sourcedata = null;
    
    /**
     * Metadata of image
     * @type {sharp.Metadata}
     */
    metadata = {};
    
    /**
     * Buffer image
     * @type {null}
     */
    bufferimage = null;
    
    /**
     * Original width
     * @type {number}
     */
    originalwidth = 0;
    
    /**
     * Original height
     * @type {number}
     */
    originalheight = 0;
    
    /**
     * constructor
     * @param source
     */
    constructor(source){
        super();
        this.sourcedata = source;
    }
    
    /**
     * Init
     */
    async init(){
        if(this.isInitialized){
            return;
        }
        
        this.isInitialized = true;
        this.bufferimage = null;
        this.sharp = sharp(this.sourcedata);
        this.metadata = await this.sharp.metadata();
        
        this.originalwidth = this.metadata.width;
        this.originalheight = this.metadata.height;
        
        //get list image sizes
        if(!listimagesizes){
            listimagesizes = await suu.settings.load('imagesizes', false);
        }
        
        if(!this.extension){
            this.extension = this.metadata.format;
        }
        
    }
    
    /**
     * Process image
     * @return {Promise<void>}
     */
    async process(){
        try{
            if(!this.isInitialized){
                await this.init();
            }
            
            if(debug.enabled){
                debug("Process edit image", this.imageid);
            }
            
            //Resize
            await this.resize();
            
            //Make thumbnail
            await this.makethumbnail();
            
            //Rotate
            await this.rotate();
            
            //Flip
            await this.flip();
            
            //Create watermark
            await this.createwatermark();
            
            //Create image package
            await this.createPackage();
            
            //Make border
            await this.makeBorder();
            
            //Make background
            await this.makeBackground();
            
            //Get image
            await this.toFormatImage();
        }catch(e){
            suu.log_error(e);
        }
        
        return null;
    }
    
    /**
     * Resize
     * @return {Promise<void>}
     */
    async resize(){
        
        let newwidth,
            newheight;
        
        if(debug.enabled){
            debug("Resizing image", this.imageid);
        }
        
        let size = this.size;
        
        if(this.shop && this.shop === true){
            size = 'shop';
        }
        
        if(this.feed && this.feed === true){
            size = 'feed';
        }
        
        //default is size params
        if(size){
            if(debug.enabled) debug("Resizing image with size:", size);
            if(suu.isNumber(size)){
                this.width = size;
                this.height = undefined;
            }else if(suu.isString(size) && listimagesizes[size]){
                Object.assign(this, listimagesizes[size]);
            }
        }
        
        //default is width and height
        if(!this.width && !this.height){
            this.width = this.metadata.width;
            this.height = this.metadata.height;
        }
        
        //get width and height
        newwidth = this.width || undefined;
        newheight = this.height || undefined;
        
        if(!newwidth){
            newwidth = Math.round(newheight * (this.originalwidth / this.originalheight));
        }
        
        if(!newheight){
            newheight = Math.round(newwidth * (this.originalheight / this.originalwidth));
        }
        
        //get max width
        if(this.maxwidth){
            if(newwidth > this.maxwidth){
                newwidth = this.maxwidth;
                newheight = Math.round(newwidth * (this.originalheight / this.originalwidth));
            }
            
            if(this.maxheight && newheight > this.maxheight){
                newheight = this.maxheight;
                newwidth = Math.round(newheight * (this.originalwidth / this.originalheight));
            }
        }
        
        //get max height
        if(this.maxheight){
            if(newheight > this.maxheight){
                newheight = this.maxheight;
                newwidth = Math.round(newheight * (this.originalwidth / this.originalheight));
            }
            
            if(this.maxwidth && newwidth > this.maxwidth){
                newwidth = this.maxwidth;
                newheight = Math.round(newwidth * (this.originalheight / this.originalwidth));
            }
        }
        
        let options = {
            fit: 'outside',
            background: {r: 255, g: 255, b: 255, alpha: 1}
        };
        
        //process crop
        if(this.crop){
            options.fit = 'cover';
            options.position = 'center';
        }
        
        if(this.thumbnail === true){
            options.fit = 'outside';
            newwidth = Math.max(newwidth || 0, newheight || 0);
            newheight = newwidth;
            
            let metainfo = this.metadata;
            if(metainfo.width > metainfo.height){
                newheight = Math.round(newwidth * (metainfo.height / metainfo.width));
            }else{
                newwidth = Math.round(newheight * (metainfo.width / metainfo.height));
            }
        }
        
        //Process resize
        if((newwidth && newheight !== this.originalheight) || (newheight && newwidth !== this.originalwidth)){
            if(debug.enabled){
                debug("Resize image to", {newwidht: newwidth || 'auto', newheight: newheight || 'auto', options});
            }
            
            options.width = newwidth;
            options.height = newheight;
            
            await this.sharp.resize(options);
        }
        
        if(!this.width){
            this.width = newwidth;
        }
        
        if(!this.height){
            this.height = newheight;
        }
        
    }
    
    /**
     * make thumbnail
     */
    async makethumbnail(){
        if(!this.thumbnail){
            return;
        }
        
        let thumbwidth = this.width;
        let thumbheight = this.height;
        
        if(!thumbheight && thumbwidth){
            thumbheight = thumbwidth;
        }
        
        if(!thumbwidth && thumbheight){
            thumbwidth = thumbheight;
        }
        
        if(this.thumbnail === true){
            thumbwidth = Math.max(thumbwidth || 0, thumbheight || 0);
            thumbheight = thumbwidth;
        }
        
        let {info} = await this.sharp.toBuffer({resolveWithObject: true});
        
        if(thumbheight !== info.height || thumbwidth !== info.width){
            if(debug.enabled){
                debug(`Make thumbnail`, {width: thumbwidth, height: thumbheight});
            }
            
            //Resize image if size not match
            let resizeoptions = {
                fit: 'outside',
                withoutEnlargement: true,
                background: {r: 255, g: 255, b: 255, alpha: 1}
            };
            
            if(info.width > thumbwidth || info.height > thumbheight){
                if(info.width > info.height){
                    resizeoptions.width = thumbwidth;
                }else{
                    resizeoptions.height = thumbheight;
                }
                
                //Resize image to fit thumbnail
                this.sharp = await this.sharp.resize(resizeoptions.width || undefined, resizeoptions.height || undefined, resizeoptions);
            }
            
            let imagethumbsource = sharp({
                create: {
                    width: thumbwidth,
                    height: thumbheight,
                    channels: 4,
                    background: {r: 255, g: 255, b: 255}
                }
            });
            
            //Composite image
            await imagethumbsource.composite([
                {
                    input: await this.sharp.toBuffer(),
                    gravity: 'center'
                }
            ]);
            
            this.sharp = imagethumbsource;
        }
        
    }
    
    /**
     * Rotate
     * @param angle
     * @return {Promise<Buffer>}
     */
    async rotate(){
    
    }
    
    /**
     * Flip
     * @param direction
     * @return {Promise<Buffer>}
     */
    async flip(){
    
    }
    
    /**
     * Create watermark
     */
    async createwatermark(){
    
    }
    
    /**
     * Create package
     */
    async createPackage(){
    
    }
    
    /**
     * Make border
     */
    async makeBorder(){
    
    }
    
    /**
     * Make background
     */
    async makeBackground(){
    
    }
    
    /**
     * Get image
     */
    async toFormatImage(){
        if(!this.isInitialized){
            await this.init();
        }
        
        //default is jpeg
        if(this.extension === 'jpg'){
            this.extension = 'jpeg';
        }
        
        if(debug.enabled) debug(`Convert image to ${this.extension}`);
        
        //Convert to jpg
        if(this.extension === 'jpeg' || this.extension === 'jpg'){
            this.sharp = this.sharp.jpeg({
                quality: this.quality || 100,
                progressive: true
            });
            
            return this;
        }
        
        //Conert to png
        if(this.extension === 'png'){
            this.sharp = this.sharp.png({
                quality: this.quality || 100,
                progressive: true
            });
            
            return this;
        }
        
        //Convert to webp
        if(this.extension === 'webp'){
            this.sharp = this.sharp.webp({
                quality: this.quality || 100,
                progressive: true
            });
            
            return this;
        }
        
        //Convert to gif
        if(this.extension === 'gif'){
            this.sharp = this.sharp.gif({
                quality: this.quality || 100,
                progressive: true
            });
            
            return this;
        }
        
        //Convert to tiff
        if(this.extension === 'tiff'){
            this.sharp = this.sharp.tiff({
                quality: this.quality || 100,
                progressive: true
            });
            
            return this;
        }
        
        //Convert to avif
        if(this.extension === 'avif'){
            this.sharp = this.sharp.avif({
                quality: this.quality || 100,
                progressive: true
            });
            
            return this;
        }
        
        if(this.extension === 'heif'){
            this.sharp = this.sharp.heif({
                quality: this.quality || 100,
                progressive: true
            });
            
            return this;
        }
        
        if(this.extension === 'raw'){
            this.sharp = this.sharp.raw({
                quality: this.quality || 100,
                progressive: true
            });
            
            return this;
        }
        
        if(this.extension === 'jp2'){
            this.sharp = this.sharp.jp2({
                quality: this.quality || 100,
                progressive: true
            });
        }
        
        return this;
    }
    
    /**
     * Get metadata
     * @return {Promise<sharp.Metadata>}
     */
    async getMetadata(){
        if(!this.isInitialized){
            await this.init();
        }
        
        return this.sharp.metadata();
    }
    
    /**
     * Get image buffer
     * @return {Promise<Buffer>}
     */
    async getBuffer(){
        if(this.bufferimage){
            return this.bufferimage;
        }
        
        if(!this.isInitialized){
            await this.init();
        }
        
        if(debug.enabled) debug(`Get image buffer`);
        
        this.bufferimage = await this.sharp.toBuffer();
        return this.bufferimage;
    }
    
}

export default ImageEditor;