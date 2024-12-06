declare var _default: ImageToHosts;
export default _default;
/**
 * Image to host
 */
declare class ImageToHosts {
    /**
     * Image host
     * @type {Object}
     */
    imagehosts: any;
    isInitialized: boolean;
    /**
     * Initialize
     */
    init(): Promise<boolean>;
    /**
     * get host name
     * @param name
     */
    getHost(name: any): Promise<any>;
}
