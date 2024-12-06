import uploadmedia from '#storageimages/controllers/features/saveimagedata.js';
import suu from 'suu';
const debug = suu.createDebug('suu:uploadmediacontroller');
import axios from 'axios';
import sharp from 'sharp';

export default class uploadmediacontroller extends suu.controller(){
    
    constructor(req, res, next){
        super(req, res, next);
    }
    
    /**
     * Get url from postman
     *
     */
    async getUrlimage(){
        
        const body = this.req.body;
        const imageUrls = body.imageUrls;
        
        if(!Array.isArray(imageUrls) || imageUrls.length === 0){
            this.sendError('Invalid image url', 400)
            return;
        }
        
        try {
            
            const uploadedImage = []
            
            for (const imageUrl of imageUrls) {
                try {
                    // using axios get image from the URL
                    const response = await axios.get(imageUrl, {
                        responseType: 'arraybuffer'
                    });
                    
                    if (response.status === 200) {
                        
                        const imageBuffer = Buffer.from(response.data);
                        
                        // using sharp get info image from the URL
                        const imageInfo = await sharp(imageBuffer).metadata();
                        
                        // using md5 to generate the uri hash
                        const uriHash = suu.md5(imageUrl);
                        
                        // save image to SSD
                        await uploadmedia.saveImageData(uriHash, imageUrl, imageBuffer, imageInfo);
                        
                        // return media data
                        const result = {
                            success: 1,
                            media: {
                                imageid: uriHash,
                                mimetype: imageInfo.format,
                                filesize: imageInfo.size,
                                url: imageUrl,
                                //mediaurl: image.mediaurl,
                            }
                        };
                        
                        uploadedImage.push(result);
                        
                    } else {
                        this.sendError('Failed to fetch image from the URL', 500);
                    }
                }
                catch (error) {
                    debug(error);
                    this.sendError('Internal Server Error', 500);
                }
            }
            
            // send the array of uploadedImage as a response
            await this.res.json(uploadedImage);
            
        } catch (error) {
            debug(error);
            this.sendError('Internal Server Error', 500);
        }
    }
    
}