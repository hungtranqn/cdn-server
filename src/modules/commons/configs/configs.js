//storage media path
let storagemediapath = app.get('storage_media_location') || null;
if(suu.isEmpty(storagemediapath)){
    storagemediapath = suu.path.getDataFilepath('storage/media');
}

//cache media path
let cachemediapath = app.get('cache_media_location') || null;
if(suu.isEmpty(cachemediapath)){
    cachemediapath = suu.path.getDataFilepath('cached/media');
}

export const MEDIA_CACHEABLE = app.get('media_cacheable');
export const MEDIA_CACHEABLE_TIME = app.get('media_cacheable_time');

//Mongodb data directory
const defaultmongodbdir = '/var/lib/mongodb';
const mongodbdir = app.get('mongodb_data_dir');
if(!suu.isEmpty(mongodbdir)){
    mongodbdir = defaultmongodbdir;
}
export const MONGODB_DATA_DIRECTORY = mongodbdir;

//request query separator
export const REQUEST_QUERY_SEPARATOR = /_qs_/;
export const REQUEST_QUERY_ARGS_SEPARATOR = '-';

//Storage constants
export const STORAGE_FILE_EXT = '.stx';
export const STORAGE_MEDIA_PATH = storagemediapath;
export const CACHE_MEDIA_PATH = cachemediapath;
export const CACHE_FILE_EXT = '.cache';

//Image status constants
export const IMAGE_STATUS_ACTIVE = 1;
export const IMAGE_STATUS_DISABLED = 0;
export const IMAGE_STATUS_DELETE = -1;  //Pending delete status

//Image host key
export const IMAGE_HOST_SUUFOREST_KEY = 'sg';