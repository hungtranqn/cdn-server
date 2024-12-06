import {Sharp, Metadata} from 'sharp';

export default ImageEditor;
/**
 * ImageEditor
 */
declare class ImageEditor {
    /**
     * constructor
     * @param source
     */
    constructor(source: any);
    /**
     * Sharp instance
     * @type {Sharp}
     */
    sharp: Sharp;
    /**
     * Source data
     * @type {Buffer}
     */
    sourcedata: Buffer;
    /**
     * Metadata of image
     * @type {Metadata}
     */
    metadata: Metadata;
    /**
     * Init
     */
    init(): Promise<void>;
    isInitialized: boolean;
    /**
     * Process image
     * @return {Promise<void>}
     */
    process(): Promise<void>;
    /**
     * Resize
     * @return {Promise<void>}
     */
    resize(): Promise<void>;
    width: any;
    height: any;
    /**
     * make thumbnail
     */
    makethumbnail(): Promise<void>;
    /**
     * Rotate
     * @param angle
     * @return {Promise<Buffer>}
     */
    rotate(): Promise<Buffer>;
    /**
     * Flip
     * @param direction
     * @return {Promise<Buffer>}
     */
    flip(): Promise<Buffer>;
    /**
     * Create watermark
     */
    createwatermark(): Promise<void>;
    /**
     * Create package
     */
    createPackage(): Promise<void>;
    /**
     * Make border
     */
    makeBorder(): Promise<void>;
    /**
     * Make background
     */
    makeBackground(): Promise<void>;
    /**
     * Get image
     */
    toFormatImage(): Promise<ImageEditor>;
    
    extension: string;
    
    /**
     * Get metadata
     * @return {Promise<Metadata>}
     */
    getMetadata(): Promise<Metadata>;
    /**
     * Get image buffer
     * @return {Promise<Buffer>}
     */
    getBuffer(): Promise<Buffer>;
}