import mongoose from "mongoose";
import {Schema} from 'mongoose';
import {CACHE_MEDIA_PATH} from "#commons/configs/configs.js";
import cachefilestorage from "#commons/utils/cachefilestorage.js";

const debug = suu.createDebug('suu:models:mediacache');
debug('Create image cache model');

//Schema
const MediaCacheSchema = new Schema({
    
    queryid: {
        type: String, index: true
    },
    
    imageid: {
        type: String, index: true
    },
    
    queryurl: String, urlpath: String, filetype: String, filesize: Number, filename: String, storagepath: String, lastaccess: {
        type: Date, default: Date.now, index: true
    },
    
    added: {
        type: Date, default: Date.now, expires: '1d' //1 Days
    }
    
});

//Model
const Mediacache = mongoose.model('mediacached', MediaCacheSchema);

//Export model
export default suu.extends(Mediacache, {
    
    properties: {
        
        data: {
            
            set(data){
                this.mediadata = data;
            },
            
            get(){
                return this.mediadata;
            }
            
        },
        
        /**
         * Set cache file path
         */
        cachefilepath: {
            
            set(data){
                if(data.startsWith(CACHE_MEDIA_PATH)){
                    data = data.substring(CACHE_MEDIA_PATH.length);
                }
                
                this.storagepath = data;
            },
            
            get(){
                if(!this.storagepath){
                    return null;
                }
                
                if(!this._stored_cachefilepath){
                    this._stored_cachefilepath = CACHE_MEDIA_PATH + this.storagepath;
                }
                
                return this._stored_cachefilepath;
            }
            
        }
        
    },
    
    statics: {
        
        /**
         * Get media from cache by queryid
         * @param queryid
         * @return {Promise<Mediacache>}
         */
        async getCache(queryid){
            if(debug.enabled) debug('Get media from cache', {queryid});
            
            let cached = await this.findOne({queryid: queryid}).exec();
            if(cached){
                return cached;
            }
            
            return null;
        },
        
        /**
         * Add image to cache
         * @param uri
         * @param data
         * @return {Promise<this>}
         */
        async addCache(queryid, data){
            if(!data && suu.isObject(queryid)){
                data = queryid;
                queryid = data.queryid || null;
            }
            
            if(!queryid){
                throw suu.invalidArgument('Invalid queryid');
            }
            
            if(debug.enabled) debug('add image to cache', queryid);
            
            let image = await this.findOne({queryid: queryid}).exec();
            if(!image){
                image = new this({
                    queryid: queryid,
                });
            }
            
            //assign data
            Object.assign(image, data);
            
            //save cache
            await image.saveCache();
            
            return image;
        }
        
    },
    
    methods: {
        
        /**
         * Save cache
         * @param full Set = true to save to cache storage and database. false to save to database only
         * @return {Promise<methods>}
         */
        async saveCache(full = true){
            try{
                if(debug.enabled){
                    debug('Save image to cache', this.queryid);
                }
                
                //Save to cache storage first
                if(full){
                    // await this.saveCacheStoragedata();
                }
                
                //Save to db later
                await this.save();
            }catch(e){
                suu.log_error(e);
            }
            
            return this;
        },
        
        /**
         * Delete cache
         * @return {Promise<*>}
         */
        async deleteCache(force = true){
            
            if(debug.enabled) debug('Delete image from cache', this.queryid);
            
            //Delete cache
            if(force){
                await this.deleteOne();
            }
            
            //Delete cache
            await this.deleteCacheStoragedata();
        },
        
        /**
         * Save cache to cache path
         * @return {Promise<void>}
         */
        async saveCacheStoragedata(){
            if(debug.enabled) debug('Save image to cache storage', this.queryid);
            let data = this.data;
            if(!data){
                throw suu.invalidArgument('Invalid data');
            }
            
            //Save to cache storage
            await cachefilestorage.saveData(this.queryid, this.data, {
                ext: this.filetype
            });
        },
        
        /**
         * Delete cache from cache path
         * @return {Promise<void>}
         */
        async deleteCacheStoragedata(){
            if(debug.enabled) debug('Delete image from cache storage', this.queryid);
            
            //Delete from cache storage
            await cachefilestorage.deleteStorageData(this.cachefilepath);
        },
        
        /**
         * Get cache storage data
         */
        async getCacheStorageData(){
            if(debug.enabled) debug('Get image from cache storage', this.queryid);
            
            //Get from cache storage
            return await cachefilestorage.getStorageDataFromPath(this.cachefilepath);
        },
        
    }
    
});