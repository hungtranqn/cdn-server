import {STORAGE_FILE_EXT} from '#commons/configs/configs.js';
import {STORAGE_MEDIA_PATH} from '#commons/configs/configs.js';

class FileStorage{
    
    gzip = true;
    storagepath = null;
    
    constructor(path, gzip = true){
        this.storagepath = path;
        this.gzip = gzip;
    }
    
    /**
     * get Saved file id location
     * @param filepath
     * @return {Promise<string>}
     */
    async getFileIdSavedLocation(fileid, ext){
        if(!fileid.length){
            return false;
        }
        
        let filepath = await this.getStorageLocation(fileid, true);
        if(ext){
            filepath += '.' + ext;
        }
        
        if(await suu.fs.pathExists(filepath)){
            return filepath;
        }
        
        return false;
    }
    
    /**
     * is File path exits
     * @param filepath
     * @return {Promise<*|boolean>}
     */
    async isFileExists(filepath){
        if(!filepath.length){
            return false;
        }
        
        if(!filepath.startsWith(this.storagepath)){
            filepath = suu.path.join(this.storagepath, suu.ltrim(filepath, '/'));
        }
        
        return await suu.fs.pathExists(filepath);
    }
    
    /**
     * Get file id location
     * @param fileid
     * @param ext
     * @return {Promise<void>}
     */
    async getFileIdLocation(fileid, ext){
        if(!fileid.length){
            return false;
        }
        
        let filepath = await this.getStorageLocation(fileid, true);
        if(ext){
            filepath += '.' + ext;
        }
        
        return filepath;
    }
    
    /**
     * Save storage data and return storage location
     * @param fileid
     * @param data
     */
    async saveData(fileid, data, options = {}){
        if(!fileid.length){
            return false;
        }
        
        let ext = options.ext || null;
        let fullpath = options.fullpath || false;
        
        let filepath = await this.getStorageLocation(fileid);
        if(ext){
            filepath += '.' + ext;
        }
        
        //save to file storage and get file path
        let savepath = await this.saveFile(filepath, data);
        if(!savepath){
            return false;
        }
        
        //Return not fullpath
        if(!fullpath && savepath.startsWith(this.storagepath)){
            savepath = savepath.substring(this.storagepath.length);
        }
        
        return savepath;
    }
    
    /**
     * Save file to storage
     * @param filepath
     * @param data
     * @return {Promise<boolean>}
     */
    async saveFile(filepath, data){
        if(!filepath.length){
            return false;
        }
        
        if(!filepath.startsWith(this.storagepath)){
            filepath = suu.path.join(this.storagepath, suu.ltrim(filepath, '/'));
        }
        
        if(this.gzip){
            await suu.fs.put_gz_contents(filepath, data);
        }else{
            await suu.fs.put_contents(filepath, data, false);
        }
        
        return filepath;
    }
    
    /**
     * Delete storage data
     * @param filepath
     */
    async deleteStorageData(filepath){
        if(!filepath.length){
            return false;
        }
        
        if(!filepath.startsWith(this.storagepath)){
            filepath = suu.path.join(this.storagepath, suu.ltrim(filepath, '/'));
        }
        
        if(!suu.fs.pathExistsSync(filepath)){
            return false;
        }
        
        return suu.fs.unlink(filepath);
    }
    
    /**
     * Get storage from path
     * @param filepath
     */
    async getStorageDataFromPath(filepath){
        if(!filepath.length){
            return false;
        }
        
        if(!filepath.startsWith(this.storagepath)){
            filepath = suu.path.join(this.storagepath, suu.ltrim(filepath, '/'));
        }
        
        if(this.gzip){
            return await suu.fs.readgzFile(filepath);
        }
        
        return await suu.fs.readFile(filepath);
    }
    
    /**
     * get Storage data of uri hash
     * @param fileid
     * @return {Promise<Buffer>}
     */
    async getStorageDataByFileId(fileid){
        if(!fileid.length){
            return false;
        }
        
        let filepath = await this.getStorageLocation(fileid, true);
        
        if(this.gzip){
            return await suu.fs.readgzFile(filepath);
        }
        
        return await suu.fs.readFile(filepath);
    }
    
    /**
     * get Storage data size of uri hash
     * @param imageid
     * @return {Promise<*|boolean>}
     */
    async getStorageDataSizeByFileId(imageid){
        if(!imageid.length){
            return false;
        }
        
        let filepath = await this.getStorageLocation(imageid, true);
        if(!await suu.fs.pathExists(filepath)){
            return false;
        }
        
        return await suu.fs.getFileSize(filepath);
    }
    
    /**
     * Get file location of uri hash
     * @param {string} imageid
     */
    async getStorageLocation(imageid, fullpath = true, ext = STORAGE_FILE_EXT){
        if(!imageid.length){
            return false;
        }
        
        let path1 = imageid.substring(0, 3),
            path2 = imageid.substring(3, 6),
            path3 = imageid.substring(6, 9),
            path4 = imageid.substring(9, 12);
        
        ext = ext || STORAGE_FILE_EXT;
        
        let location = suu.path.join(path1, path2, path3, path4, imageid + ext);
        if(fullpath){
            location = suu.path.join(this.storagepath, location);
        }
        
        return location;
    }
    
    /**
     * Get storage data size
     * @param filepath
     */
    async getStorageDataSize(filepath){
        if(!filepath.length){
            return false;
        }
        
        if(!filepath.startsWith(this.storagepath)){
            filepath = suu.path.join(this.storagepath, suu.ltrim(filepath, '/'));
        }
        
        if(!await suu.fs.pathExists(filepath)){
            return false;
        }
        
        return await suu.fs.getFileSize(filepath);
    }
    
}

export {FileStorage};

export default new FileStorage(STORAGE_MEDIA_PATH);