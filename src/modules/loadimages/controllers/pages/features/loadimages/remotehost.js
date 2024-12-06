import sharp from "sharp";
import mime from 'mime-types';

const debug          = suu.createDebug('suu:loadimages:remotehost'),
      sourceloadtype = 'remotehost';

class SourceContentRemoteHost{
    priority = 50;
    
    /**
     * get Source content from cache
     */
    async getsourcecontents(image){
        if(!image.isRemoteHostSource || image.sourceloaded[sourceloadtype]){
            return null;
        }
        
        if(debug.enabled) debug('Load source image from host', {
            sourceid: image.sourceid,
            sourceurl: image.sourceurl,
        });
        
        //get response from host
        let response = await suu.http.getBinary(image.sourceurl, {
            timeout: 10000, //wait 10s
        });
        
        //is Success
        if(response.httpstatus.isOk){
            image.sourceloaded[sourceloadtype] = true;
            let sharpimage = sharp(response.data),
                metadata   = await sharpimage.metadata();
            
            if(metadata.width > 0 && metadata.format){
                return response.data;
            }
            
            throw suu.invalidArgument('Source image is not vaild', {
                response: response,
            });
        }
        
        //Url is not found
        if(response.httpstatus.isNotFound){
            suu.emit('loadimages:source:notfound', image);
            throw suu.invalidArgument('Source image not found', {
                response: response,
            });
        }
        
        //Image load host error
        image.loadhttpstatus = response.httpstatus;
        
        image.sourceloaded[sourceloadtype] = false;
        throw suu.invalidArgument('Source image not vaild', {
            response: response,
        });
    }
    
}

export {sourceloadtype};
export default new SourceContentRemoteHost();