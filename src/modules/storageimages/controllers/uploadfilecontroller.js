import uploadmedia from '#storageimages/controllers/features/saveimagedata.js';
import suu from 'suu';
const debug = suu.createDebug('suu:uploadmediacontroller');
import sharp from 'sharp';

export default class uploadfilecontroller extends suu.controller(){
    
    constructor(req, res, next){
        super(req, res, next);
    }
    
    /**
     * Get url from postman
     *
     */
    async getFileImage(){
        
        try {
            if (!this.req.files) {
                this.sendError('No image file uploaded', 400);
                return;
            }
            
            const imageFile = this.req.files[0];
            const imageBuffer = imageFile.buffer;
            
            // using sharp to get image metadata
            const imageInfo = await sharp(imageFile.buffer).metadata();
            
            // using md5 to generate the URI hash
            const uriHash = suu.md5(imageFile.originalname);
            
            // save the image to SSD
            await uploadmedia.saveImageData(uriHash, imageFile.originalname, imageBuffer, imageInfo);
            
            const result = {
                success: 1,
                media: {
                    imageid: uriHash,
                    mimetype: imageInfo.format,
                    filesize: imageInfo.size,
                }
            };
            
            await this.res.json(result);
            
        } catch (error) {
            debug(error);
            this.sendError('Internal Server Error', 500);
        }
    }
}