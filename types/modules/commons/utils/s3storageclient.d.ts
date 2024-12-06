declare var _default: S3StorageClient;
export default _default;
declare class S3StorageClient {
    s3: any;
    bucket: any;
    /**
     * Get object from S3
     * @param key
     * @return {Promise<unknown>}
     */
    getObject(key: any): Promise<unknown>;
    /**
     * Put object to S3
     * @param key
     * @param body
     * @return {Promise<unknown>}
     */
    putObject(key: any, body: any): Promise<unknown>;
    /**
     * Delete object from S3
     * @param key
     * @return {Promise<unknown>}
     */
    deleteObject(key: any): Promise<unknown>;
    /**
     * List objects from S3
     * @return {Promise<unknown>}
     */
    listObjects(): Promise<unknown>;
}
