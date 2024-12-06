import {CACHE_MEDIA_PATH} from '#commons/configs/configs.js';
import {FileStorage} from "./filestorage.js";

/**
 * Cache file storage
 */
class CacheFileStorage extends FileStorage{

}

export default new CacheFileStorage(CACHE_MEDIA_PATH, false);