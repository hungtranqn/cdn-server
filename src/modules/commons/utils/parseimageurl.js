import Baseimage from "#commons/utils/abstracts/baseimage.js";
import imagetohosts from "#commons/utils/imagetohosts.js";
import parsequeryargs from "#commons/utils/parsequeryargs.js";
import lodash from "lodash";
import {Url} from 'url';
import Uri from 'suu/uri';
import {REQUEST_QUERY_SEPARATOR} from "#commons/configs/configs.js";
import {IMAGE_HOST_SUUFOREST_KEY} from "#commons/configs/configs.js";
import mimetype from 'mime-types';

const debug = suu.createDebug('suu:loadimages:parseimageurl');

/**
 * Parse image url
 */
export default class ParseImageUrl extends Baseimage{
    
    constructor(url){
        super();
        this.url = url;
    }
    
    /**
     * Parse Url
     * @param url
     * @return {Promise<boolean>}
     */
    async parse(url){
        try{
            if(url){
                this.url = url;
            }
            
            debug('Parse image url: ', this.url);

            let uri     = new Uri(this.url),
                urlpath = uri.pathname;

            this.urlpath = urlpath;
            this.urlpathid = suu.md5(urlpath);
            //Uri
            this.uri = uri;
            let parts = urlpath.split(REQUEST_QUERY_SEPARATOR);
            if(!parts.length){
                return false;
            }
            await suu.all([
                this._parseSourceUrl(parts[0]),
                this._parseQuery(parts[1] || null)
            ]);
            return true;
        }catch(e){
            suu.log_error(e);
        }
    }
    
    /**
     * Parse source url
     * @return {Promise<void>}
     */
    async _parseSourceUrl(data){
        if(!data){
            return false;
        }
        
        let parts = lodash.trim(data, '/').split('/');
        let uri = new Url();
        
        //Parse protocol
        let protocol = parts.shift();
        uri.protocol = protocol === 'img' ? 'http' : 'https';
        this.protocol = uri.protocol;
        
        //Parse host
        let host = parts.shift();
        let hostName = await imagetohosts.getHost(host);
        if(host && !hostName){
            hostName = host.replace(/--/g, '.');
        }
        
        //Image host
        uri.hostname = hostName;
        this.imagehost = hostName;
        this.imagehostkey = host;
        this.isSuuforestSource = (host === IMAGE_HOST_SUUFOREST_KEY);
        this.isRemoteHostSource = !this.isSuuforestSource;
        this.isS3Storage = this.isSuuforestSource;
        
        //Parse path
        uri.pathname = '/' + parts.join('/');
        this.imagepath = uri.pathname;
        this.imagename = suu.path.filename(uri.pathname);
        
        //get Source Uri
        this.sourceuri = new Uri(uri.format());
        this.sourceurl = this.sourceuri.toString();
        
        let urlqs = this.uri.query;
        if(!suu.isEmpty(urlqs)){
            this.sourceuri.query = urlqs;
        }
        
        //Get source id
        this.sourceid = this.sourceuri.md5;
        this.imageid = this.sourceid;
        
        return true;
    }
    
    /**
     * Parse image query to display clients
     * @param querystr
     * @return {Promise<boolean>}
     * @private
     */
    async _parseQuery(querystr){
        if(!querystr){
            return false;
        }
        
        let extension = querystr.split('.').pop(),
            strqs = querystr.slice(0, -extension.length - 1);
        this.extension = extension;
        
        let parseargs = parsequeryargs(strqs);
        if(!parseargs){
            return false;
        }
        
        //Apply args to this object
        suu.extends(this, parseargs);
        
        //Mime type
        this.mimetype = mimetype.lookup(this.extension);
        
        return true;
    }
    
}