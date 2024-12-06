import Paralleltasks from 'suu/paralleltasks';

import contentconfigs from '#loadimages/configs/contents.js';
import {STORAGE_MEDIA_PATH, CACHE_MEDIA_PATH} from '#commons/configs/configs.js';
import modelmediacache from '#models/mediacache.js';
import modelmediacontents from '#models/mediacontents.js';

const debug = suu.createDebug('suu:loadimages:cleanmediacontenthelper');

/**
 * Clean media content helper
 */
export default class Cleanmediacontenthelper{

    MAX_CLEAN_ITEMS = 100;

    min_free_disk_space = 0;
    min_clean_disk_space = 0;
    max_clean_disk_space = 0;
    min_clean_media_items = 0;
    max_clean_media_items = 0;

    cache_min_free_disk_space = 0;
    cache_min_clean_disk_space = 0;
    cache_max_clean_disk_space = 0;
    cache_min_clean_items = 0;
    cache_max_clean_items = 0;

    isrequirecleancache = false;
    isrequirecleanmedia = false;

    /**
     * Total cache size deleted
     * @type {number}
     */
    cachedeleted = 0;

    /**
     * Total cache number deleted
     * @type {number}
     */
    cachedeletednumber = 0;

    /**
     * Total media size deleted
     * @type {number}
     */
    mediadeleted = 0;

    /**
     * Total cache number deleted
     * @type {number}
     */
    mediadeletednumber = 0;

    /**
     * Task clean media
     * @type {Paralleltasks}
     */
    taskcleanmedia = null;

    /**
     * Task clean cache
     * @type {Paralleltasks}
     */
    taskcleancache = null;

    /**
     * Get instance
     * @return {Cleanmediacontenthelper}
     */
    static get instance(){
        if(!this._instance){
            this._instance = new this();
        }
        return this._instance;
    }

    /**
     * Run check disk spaces and clean media if required
     * @return {Promise<void>}
     */
    static async cleanifrequired(){
        debug('Run clean cache and contents if required');

        let instance = this.instance;
        let check = await instance.checkspaces();

        let tasks = [];

        if(check.isrequirecleanmedia){
            tasks.push(instance.cleanmedia());
        }

        if(check.isrequirecleancache){
            tasks.push(instance.cleancache());
        }

        return await suu.all(tasks);
    }

    /**
     * Constructor
     * @param options
     */
    constructor(options){
        Object.assign(this, contentconfigs);
        if(options){
            Object.assign(this, options);
        }

        //convert to bytes
        this.min_free_disk_space = suu.filesizes.gbtoBytes(this.min_free_disk_space);
        this.min_clean_disk_space = suu.filesizes.gbtoBytes(this.min_clean_disk_space);
        this.max_clean_disk_space = suu.filesizes.gbtoBytes(this.max_clean_disk_space);

        this.cache_min_free_disk_space = suu.filesizes.gbtoBytes(this.cache_min_free_disk_space);
        this.cache_min_clean_disk_space = suu.filesizes.gbtoBytes(this.cache_min_clean_disk_space);
        this.cache_max_clean_disk_space = suu.filesizes.gbtoBytes(this.cache_max_clean_disk_space);

    }

    /**
     * Check disk spaces
     * @return {Promise<Cleanmediacontenthelper>}
     */
    async checkspaces(){

        //Run checks
        await suu.go(
            () => this.checkspacecache(),
            () => this.checkspacemedia(),
        );

        return {
            isrequirecleancache: this.isrequirecleancache,
            isrequirecleanmedia: this.isrequirecleanmedia,
        };
    }

    /**
     * Check space cache
     */
    async checkspacecache(){
        try{
            if(!this.cache_min_free_disk_space){
                return false;
            }

            let currentcachefreespace = await suu.disk.getFreeSpace(CACHE_MEDIA_PATH, false);
            if(debug.enabled){
                debug('Current free space cache: %s gb', suu.filesizes.toGb(currentcachefreespace));
                debug('require min free space cache: %s gb', suu.filesizes.toGb(this.cache_min_free_disk_space));
            }

            this.isrequirecleancache = currentcachefreespace < this.cache_min_free_disk_space;
            return this.isrequirecleancache;
        }catch(e){
            suu.log_error(e);
            return false;
        }
    }

    /**
     * Check space media
     */
    async checkspacemedia(){
        if(!this.min_free_disk_space){
            return false;
        }

        let currentmediafreespace = await suu.disk.getFreeSpace(STORAGE_MEDIA_PATH, false);
        if(debug.enabled){
            debug('Current free space media: %s gb', suu.filesizes.toGb(currentmediafreespace));
            debug('require min free space media: %s gb', suu.filesizes.toGb(this.min_free_disk_space));
        }

        this.isrequirecleanmedia = currentmediafreespace < this.min_free_disk_space;
        return this.isrequirecleanmedia;
    }

    /**
     * run clean
     * @return {Promise<void>}
     */
    async runclean(force = false){

        //force to run clean
        if(!force){
            this.checkspaces();
        }

        //run clean cache
        if(force || results.isrequirecleanmedia){
            suu.go(() => this.cleanmedia());
        }

        //run clean media
        if(force || results.isrequirecleancache){
            suu.go(() => this.cleancache());
        }

    }

    /**
     * Run clean media content
     */
    async cleanmedia(){

        debug('Run clean media content');

        /**
         * Task clean media content
         * @type Paralleltasks
         */
        if(!this.taskcleanmedia){
            this.taskcleanmedia = new Paralleltasks([this, 'deletemediaitem'], 100);
        }

        if(debug.enabled) debug("Min clean media spaces: ", this.min_clean_disk_space);
        if(debug.enabled) debug("Max clean media spaces: ", this.max_clean_disk_space);
        if(debug.enabled) debug("Min clean media items: ", this.min_clean_media_items);
        if(debug.enabled) debug("Max clean media items: ", this.max_clean_media_items);

        let validdeleted;

        do{

            if(!this.taskcleanmedia.isContinue){
                break;
            }

            debug('Clean cache media content', this.taskcleanmedia.count);

            if(this.taskcleanmedia.count < this.MAX_CLEAN_ITEMS){
                let items = await modelmediacontents.find().sort({lastaccess: 1}).limit(this.MAX_CLEAN_ITEMS).exec();

                if(!items.length && !this.taskcleanmedia.count){
                    break;
                }

                if(items.length){
                    for(let item of items){
                        if(this.taskcleanmedia.isContinue){
                            this.taskcleanmedia.submit(item);
                        }
                    }
                }
            }

            //wait 100ms to delete items
            await suu.sleep(100);

            //check vaild deleted
            validdeleted = (this.mediadeleted >= this.min_clean_disk_space && this.mediadeleted <= this.max_clean_disk_space) ||
                (this.mediadeletednumber >= this.min_clean_media_items && this.mediadeletednumber <= this.max_clean_media_items);
            if(validdeleted){
                break;
            }

        }while(true);

        //Stop clean media
        this.taskcleanmedia.stop();

        if(debug.enabled){
            debug('Deleted %s gb media content with %s items', suu.filesizes.toGb(this.mediadeleted), this.mediadeletednumber);
        }

    }

    /**
     * Clean cache content
     * @return {Promise<void>}
     */
    async cleancache(){
        debug('Run clean cache content');

        if(!this.taskcleancache){
            this.taskcleancache = new Paralleltasks([this, 'deletecacheitem'], 100);
        }

        if(debug.enabled) debug("Min clean cache spaces: ", this.cache_min_clean_disk_space);
        if(debug.enabled) debug("Max clean cache spaces: ", this.cache_max_clean_disk_space);
        if(debug.enabled) debug("Min clean cache items: ", this.cache_min_clean_items);
        if(debug.enabled) debug("Max clean cache items: ", this.cache_max_clean_items);

        let vailddeleted;

        do{

            if(!this.taskcleancache.isContinue){
                break;
            }

            debug('Clean cache content', this.taskcleancache.count);

            if(this.taskcleancache.count < this.MAX_CLEAN_ITEMS){
                let items = await modelmediacache.find().sort({lastaccess: 1}).limit(this.MAX_CLEAN_ITEMS).exec();

                if(!items.length && !this.taskcleancache.count){
                    break;
                }

                if(items.length){
                    for(let item of items){
                        if(this.taskcleancache.isContinue){
                            this.taskcleancache.submit(item);
                        }
                    }
                }
            }

            //wait 5s to delete items
            await suu.sleep(100);

            vailddeleted = (this.cachedeleted >= this.cache_min_clean_disk_space && this.cachedeleted <= this.cache_max_clean_disk_space) ||
                (this.cachedeletednumber >= this.cache_min_clean_items && this.cachedeletednumber <= this.cache_max_clean_items);

            if(vailddeleted){
                break;
            }

        }while(true);

        //Stop clean cache
        this.taskcleancache.stop();

        if(debug.enabled){
            debug('Stop clean cache content');
            debug('Deleted %s gb cache content with %s items', suu.filesizes.toGb(this.cachedeleted), this.cachedeletednumber);
        }

    }

    /**
     * Delete media item
     * @param {MediaContents} item
     * @return {Promise<void>}
     */
    async deletemediaitem(item){
        try{
            debug('Delete media item', item.imageid);
            let deletesize = await item.getStoragedataSize();
            await item.deleteImage(true);
            this.mediadeleted += deletesize;
            this.mediadeletednumber++;
        }catch(e){
            suu.log_error(e);
        }
    }

    /**
     * Delete cache item
     * @param {modelmediacache} item
     * @return {Promise<void>}
     */
    async deletecacheitem(item){
        try{
            debug('Delete cache item', item.imageid);
            await item.deleteCache(true);
            this.cachedeleted += item.filesize;
            this.cachedeletednumber++;
        }catch(e){
            suu.log_error(e);
        }
    }

}