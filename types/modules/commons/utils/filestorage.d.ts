declare namespace _default {
    /**
     * Save storage data
     * @param imageid
     * @param data
     */
    function saveData(imageid: any, data: any): Promise<boolean>;
    /**
     * Save storage data
     * @param imageid
     * @param data
     */
    function saveData(imageid: any, data: any): Promise<boolean>;
    /**
     * Save file to storage
     * @param filepath
     * @param data
     * @return {Promise<boolean>}
     */
    function saveFile(filepath: any, data: any): Promise<boolean>;
    /**
     * Save file to storage
     * @param filepath
     * @param data
     * @return {Promise<boolean>}
     */
    function saveFile(filepath: any, data: any): Promise<boolean>;
    /**
     * Get storage from path
     * @param filepath
     */
    function getStorageDataFromPath(filepath: any): Promise<any>;
    /**
     * Get storage from path
     * @param filepath
     */
    function getStorageDataFromPath(filepath: any): Promise<any>;
    /**
     * get Storage data of uri hash
     * @param imageid
     * @return {Promise<Buffer>}
     */
    function getStorageDataByImageId(imageid: any): Promise<Buffer>;
    /**
     * get Storage data of uri hash
     * @param imageid
     * @return {Promise<Buffer>}
     */
    function getStorageDataByImageId(imageid: any): Promise<Buffer>;
    /**
     * Get file location of uri hash
     * @param {string} imageid
     */
    function getStorageLocation(imageid: string, fullpath?: boolean): Promise<any>;
    /**
     * Get file location of uri hash
     * @param {string} imageid
     */
    function getStorageLocation(imageid: string, fullpath?: boolean): Promise<any>;
}
export default _default;
