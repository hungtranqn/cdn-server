/**
 * Media contents model (images, videos, etc)
 */
import {IMAGE_STATUS_ACTIVE, IMAGE_STATUS_DELETE, IMAGE_STATUS_DISABLED} from "#commons/configs/configs.js";
import {STORAGE_MEDIA_PATH, CACHE_MEDIA_PATH} from "#commons/configs/configs.js";

import mongoose from "mongoose";
import {Schema} from 'mongoose';
import filestorage from "#commons/utils/filestorage.js";
import BaseModelMethods from "suu/model/base/basemethods.js";

const debug = suu.createDebug('models:imagecontents');
import mimetypes from 'mime-types';

debug('Create image content model');

const objectcache = suu.createCache('loadimages:database');

export {objectcache};
import lodash from 'lodash';
//Schema media contents
const MediaContentsSchema = new Schema({
    
    imageid: {
        type: String, index: true
    },
    
    url: String,
    filesize: Number,
    filename: String,
    storagepath: String,
    mimetype: String,
    lastaccess: {
        type: Date, index: true
    },
    
    s3index: {
        type: String, index: true
    },
    
    added: {
        type: Date,
        default: Date.now,
        index: true
    },
    
    status: {
        type: Number,
        default: IMAGE_STATUS_ACTIVE, //1: active, -1: deleted
        index: true
    },
    imagedata: Schema.Types.Buffer
    
});
/**
 * Default image data
 * @type {{}}
 */
const defaultimagedata = {
    imageid: undefined,
    url: undefined,
    storagepath: undefined,
    filesize: undefined,
    mimetype: undefined,
    lastaccess: undefined,
    s3index: undefined,
    added: undefined,
    imagedata: undefined,
    status: IMAGE_STATUS_ACTIVE,
};

/**
 * Media contents model
 * @typedef {MediaContents} MediaContents
 */
class MediaContents extends mongoose.model('mediacontents', MediaContentsSchema){
    
    imagedata = null;
    
    /**
     * Set image data
     * @param data
     */
    set data(data){
        this.imagedata = data;
    }
    
    /**
     * Get image data
     * @return {null}
     */
    get data(){
        return this.imagedata;
    }
    
    /**
     * get object cache
     * @param imageid
     */
    static async getObjectCache(imageid){
        return await objectcache.get(imageid);
    }
    
    /**
     * Get image contents
     * @param urihash
     * @return {Promise<MediaContents>}
     */
    static async getImage(imageid){
        return await this.findOne({imageid: imageid}).exec();
    }
    
    /**
     * Add image to imagecontents
     * @param {defaultimagedata} data
     */
    static async addImage(data, autosave = true){
        //set defaults data
        data = suu.defaults(data, defaultimagedata);
        
        if(suu.isEmpty(data.imageid)){
            throw suu.invalidArgument('imageid is required');
        }
        
        debug('Add image to imagecontents', data.imageid, data.url);
        let image = await this.getImage(data.imageid);
        if(!image){
            image = new this({
                imageid: data.imageid,
                imagedata: data.imagedata
            });
        }
        //Apply data
        await suu.applyIf(image, data);
        
        //Save media
        if(autosave){
            await image.saveMedia();
        }
        
        return image;
    }
    
    /**
     * Save media
     * @return {Promise<void>}
     */
    async saveMedia(data){
        try{
            if(data){
                await suu.applyIf(this, data);
            }
            
            //is empty imageid
            if(suu.isEmpty(this.imageid)){
                throw suu.invalidArgument('imageid is required');
            }
            
            //save model first
            let storagepath = await filestorage.getStorageLocation(this.imageid, false);
            if(!this.storagepath || this.storagepath !== storagepath){
                this.storagepath = storagepath;
            }
            
            //Save file name
            if(!this.filename && this.url){
                this.filename = suu.path.basename(this.url);
            }
            
            //Save file size
            if(!this.filesize && this.imagedata){
                this.filesize = this.imagedata.length;
            }
            
            //Save mimetype
            if(!this.mimetype && this.filename){
                this.mimetype = mimetypes.lookup(this.filename);
            }
            
            //Save image data
            let tasks = [this.save()];
            //Save image data
            if(this.imagedata){
                // tasks.push(filestorage.saveFile(storagepath, this.imagedata));
            }
            
            //Wait all tasks complete
            await suu.all(tasks);
            
            //save to cache
            suu.go(() => {
                objectcache.set(this.imageid, this.toObject());
            });
            
            return this;
        }catch(e){
            suu.log_error(e);
        }
    }
    
    /**
     * Delete image
     * @param uri
     */
    async deleteImage(force = false){
        debug('Delete image', this.imageid);
        
        //Delete object cache
        suu.go(() => {
            objectcache.delete(this.imageid);
        });
        
        if(force){
            await this.deleteOne();
            await this.deleteStoragedata();
            return;
        }
        
        this.status = IMAGE_STATUS_DELETE;
        return await this.save();
    }
    
    /**
     * Get storage data from file
     */
    async getStoragedata(){
        if(this.storagepath){
            if(debug.enabled) debug('Get storage data from path', this.storagepath);
            
            let results = await filestorage.getStorageDataFromPath(this.storagepath);
            if(debug.enabled){
                debug("Get storage data from path is complete", this.storagepath);
            }
            return results;
        }
        
        if(debug.enabled) debug('Get storage data from fileid', this.imageid);
        return await filestorage.getStorageDataByFileId(this.imageid);
    }
    
    /**
     * get storage data file size
     * @return {Promise<number>}
     */
    async getStoragedataSize(){
        if(this.storagepath){
            return await filestorage.getStorageDataSize(this.storagepath);
        }
        
        return await filestorage.getStorageDataSizeByFileId(this.imageid);
    }
    
    /**
     * Delete file storage data
     * @return {Promise<void>}
     */
    async deleteStoragedata(){
        if(this.storagepath){
            return await filestorage.deleteStorageData(this.storagepath);
        }
    }
    
}

export default MediaContents;