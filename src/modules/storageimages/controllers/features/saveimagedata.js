import filestorage from '#commons/utils/filestorage.js';
import mediacontents  from '#models/mediacontents.js';
const debug = suu.createDebug('suu:saveimagecontroller');

export default {
    /**
     * Get storage from path
     * @param uriHash
     * @param url
     * @param imageBuffer
     * @param imageInfo
     */
    async saveImageData(uriHash, url, imageBuffer, imageInfo){
        debug(url)
        
        
        // save image to SSD
        await  filestorage.saveData(uriHash,imageBuffer);
        
        // add image to database
        await this.addUpadateImage(uriHash, url, imageBuffer, imageInfo);
    },
    
    /**
     * Save media to database
     * @param uriHash
     * @param url
     * @param imageBuffer
     * @param imageInfo
     */
    async addUpadateImage(uriHash, url, imageBuffer, imageInfo){
        
        return await mediacontents.addImage({
            imageid: uriHash,
            url: url,
            imagedata: imageBuffer,
            mimetype: imageInfo.format,
            filesize: imageInfo.size,
        });
    }
}