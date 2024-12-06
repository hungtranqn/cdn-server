import filestorage from "#commons/utils/filestorage.js";
import modelmediacontents, {objectcache} from '#models/mediacontents.js';
import ImageEditor from "#commons/utils/imageeditor.js";
import lodash from 'lodash';
const debug          = suu.createDebug('suu:loadimages:database'),
      sourceloadtype = 'database';

class SourceContentDatabases{
    priority = 15;
    
    /**
     * get Source content from cache
     * @param {Baseimage} image
     * @return {Promise<Buffer>}
     */
    async getsourcecontents(image){
        if(debug.enabled){
            debug('Load source image from database', image.sourceid);
        }
        let cached = await modelmediacontents.getObjectCache(image.sourceid);
        if(cached){
            // let contents = await filestorage.getStorageDataFromPath(cached.storagepath);
            let contents = new Buffer.from( cached.imagedata, 'base64');
            if(contents){
                image.sourceloaded[sourceloadtype] = true;
                image.isSourceInDatabase = true;
                if(debug.enabled){
                    debug('Load source image from cache of content complete', image.sourceid, cached.filename);
                }
                return contents;
            }

            if(debug.enabled) debug('Load source image from cache of content is not found', image.sourceid, cached.filename);
        }
        //Load from database
        let mediacontent = await modelmediacontents.getImage(image.sourceid);
        if(mediacontent){
            // let contents = await mediacontent.getStoragedata();
            let contents = new Buffer.from( mediacontent.toObject().imagedata.toString("base64"), 'base64');
            if(contents){
                image.sourceloaded[sourceloadtype] = true;
                image.isSourceInDatabase = true;
                await objectcache.set(image.sourceid, mediacontent.toObject());
                return contents;
            }
        }
        image.sourceloaded[sourceloadtype] = false;
        return null;
    }
    /**
     * Save content to db
     * @param {Baseimage} image
     * @param {Buffer} data
     * @return {Promise<void>}
     */
    async aftergetsourcecontents(image, sourcedata){
        if(!sourcedata || image.isSourceInDatabase || image.isCached){
            return;
        }

        debug('Save source image to database', {imageid: image.sourceid, url: image.sourceurl, filename: image.imagename, length: sourcedata.length});
        let imagestorage = await modelmediacontents.addImage({
            imageid: image.sourceid,
            url: image.sourceurl,
            filename: image.imagename,
            imagedata: sourcedata,
            mimetype: image.mimetype,
        });
        
        //Trigger save event
        suu.emit('loadimages:source:saveimage', imagestorage, image);
    }
    
}

export {sourceloadtype};
export default new SourceContentDatabases();