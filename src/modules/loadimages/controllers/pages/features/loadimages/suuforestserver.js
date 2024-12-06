const debug = suu.createDebug('suu:loadimages:suuforestserver'),
    sourceloadtype = 'suuforestserver';

class SourceContentSuuforestServer{
    priority = 30;
    
    /**
     * get Source content from cache
     * @param {Baseimage} image
     */
    async getsourcecontents(image){
        if(!image.isSuuforestSource){
            return null;
        }
        
        debug('Load source image from suuforest server', image.sourceid);
        image.sourceloaded[sourceloadtype] = false;
    }
    
}

export {sourceloadtype};
export default new SourceContentSuuforestServer();