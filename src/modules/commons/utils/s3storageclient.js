import AWS from 'aws-sdk';

class S3StorageClient{
    constructor(){
        let s3config = suu.app.get('s3storage');
        this.s3 = new AWS.S3({
            accessKeyId: s3config.accessKeyId,
            secretAccessKey: s3config.secretAccessKey,
            region: s3config.region,
            signatureVersion: 'v4',
            endpoint: s3config.endpoint,
        });
        
        this.bucket = s3config.bucket;
    }
    
    /**
     * Get object from S3
     * @param key
     * @return {Promise<unknown>}
     */
    getObject(key){
        
        const params = {
            Bucket: this.bucket,
            Key: key
        };
        
        return new Promise((resolve, reject) => {
            this.s3.getObject(params, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data.Body);
                }
            });
        });
    }
    
    /**
     * Put object to S3
     * @param key
     * @param body
     * @return {Promise<unknown>}
     */
    putObject(key, body){
        
        const params = {
            Bucket: this.bucket,
            Key: key,
            Body: body
        };
        
        return new Promise((resolve, reject) => {
            this.s3.putObject(params, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
    
    /**
     * Delete object from S3
     * @param key
     * @return {Promise<unknown>}
     */
    deleteObject(key){
        
        const params = {
            Bucket: this.bucket,
            Key: key
        };
        
        return new Promise((resolve, reject) => {
            this.s3.deleteObject(params, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
    
    /**
     * List objects from S3
     * @return {Promise<unknown>}
     */
    listObjects(){
        const params = {
            Bucket: this.bucket,
        };
        
        return new Promise((resolve, reject) => {
            this.s3.listObjects(params, (err, data) => {
                if(err){
                    reject(err);
                }else{
                    resolve(data);
                }
            });
        });
    }
    
}

export default new S3StorageClient();