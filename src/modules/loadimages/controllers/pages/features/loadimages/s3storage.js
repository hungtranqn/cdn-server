const debug = suu.createDebug('suu:loadimages:s3storage'),
    sourceloadtype = 's3storage';

class SourceContentS3Storage{
    priority = 100;
    
    /**
     * get Source content from cache
     * @param {Baseimage} image
     */
    async getsourcecontents(image){
        if(!image.isS3Storage && !image.sourceloaded[sourceloadtype]){
            return null;
        }
        
        debug('Load source image from s3storage', image.sourceid);
        image.sourceloaded[sourceloadtype] = false;
    }
    
}

export {sourceloadtype};
export default new SourceContentS3Storage();