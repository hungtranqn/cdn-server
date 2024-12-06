import mongoose from 'mongoose';
export default MediaContents;
/**
 * Media contents model
 */
declare class MediaContents extends mongoose.Document<any> {
    /**
     * Get image contents
     * @param imageid
     * @return {Promise<MediaContents>}
     */
    static getImage(imageid: any): Promise<MediaContents>;
    /**
     * Add image to imagecontents
     * @param {defaultimagedata} data
     */
    static addImage(data: {}, autosave?: boolean): Promise<MediaContents>;
    
    imagedata: any;
    
    /**
     * Set image data
     * @param data
     */
    set data(arg: null);
    /**
     * Get image data
     * @return {null}
     */
    get data(): null;
    
    /**
     * Save media
     * @return {Promise<void>}
     */
    saveMedia(data: any): Promise<void>;
    
    storagepath: any;
    filename: any;
    filesize: any;
    mimetype: any;
    
    /**
     * Delete image
     * @param uri
     * @return {Promise<*>}
     */
    deleteImage(): Promise<any>;
    
    status: any;
    
    /**
     * Delete image
     * @param uri
     * @return {Promise<*>}
     */
    delete(): Promise<any>;
    
    /**
     * Get storage data from file
     */
    getStoragedata(): Promise<any>;
}