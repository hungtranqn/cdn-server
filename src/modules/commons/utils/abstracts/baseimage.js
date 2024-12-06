/**
 * Base image
 */
class Baseimage{
    
    /**
     * Is initialized
     * @param source
     */
    isInitialized = false;
    
    /**
     * Parse url
     * @type {string}
     */
    url = null;
    
    /**
     * Url path
     * @type {null}
     */
    urlpath = null;
    
    /**
     * Url path id
     * @type {null}
     */
    urlpathid = null;
    
    /**
     * Current Uri of url
     * @type {Uri}
     */
    uri = null;
    
    /**
     * Source url
     * @type {Uri}
     */
    sourceuri = null;
    
    /**
     * Source url
     * @type {string}
     */
    sourceurl = null;
    
    /**
     * Source url id.
     * Md5 of source url
     * @type {string}
     */
    sourceid = null;
    
    /**
     * Alias of source id
     * @type {string}
     */
    imageid = null;
    
    /**
     * Http protocol
     * @type {string}
     */
    protocol = null;
    
    /**
     * Image host key
     * @type {string}
     */
    imagehostkey = null;
    
    /**
     * Image host
     * @type {string}
     */
    imagehost = null;
    
    /**
     * Image path
     * @type {string}
     */
    imagepath = null;
    
    /**
     * File name
     * @type {null}
     */
    imagename = null;
    
    /**
     * Image size
     * @type {number
     */
    size = null;
    
    /**
     * Image query
     * @type {number}
     */
    width = null;
    
    /**
     * Image height
     * @type {Number}
     */
    height = null;
    
    /**
     * Image max width
     * @type {number}
     */
    maxwidth = null;
    
    /**
     * Image max height
     * @type {string}
     */
    maxheight = null;
    
    /**
     * Image quality
     * @type {null}
     */
    quality = null;
    
    /**
     * File extension
     * @type {null}
     */
    extension = null;
    
    /**
     * Thumbnail
     * @type {null}
     */
    thumbnail = null;
    
    /**
     * Watermark
     * @type {string}
     */
    watermark = null;
    
    /**
     * Crop
     * @type {Boolean}
     */
    crop = null;
    
    /**
     * Border
     * @type {string|number
     */
    border = null;
    
    /**
     * Background
     * @type {string|number}
     */
    background = null;
    
    /**
     * Type
     * @type {string}
     */
    type = null;
    
    /**
     * Put image to left top
     * @type {string}
     */
    imagetopleft = null;
    
    /**
     * Put image to right top
     * @type {string}
     */
    imagetopright = null;
    
    /**
     * Put image to left bottom
     * @type {string}
     */
    imagebottomleft = null;
    
    /**
     * Put image to right bottom
     * @type {string}
     */
    imagebottomright = null;
    
    /**
     * Put image to center
     * @type {string}
     */
    imagecenter = null;
    
    /**
     * Package
     * @type {number}
     */
    package = null;
    
    /**
     * Mime type
     * @type {string}
     */
    mimetype = null;
    
    /**
     * Shop size
     * @type {string}
     */
    shop = null;
    
    /**
     * Shop size
     * @type {string}
     */
    feed = null;
    
    /**
     * Source load type
     * @type {string}
     */
    sourceloadtype = null;
    
    /**
     * Begin load source time
     * @type {number}
     */
    beginloadsourcetime = null;
    
    /**
     * End load source time
     * @type {number}
     */
    endloadsourcetime = null;
    
    /**
     * Check source is storage on suuforest server
     * @type {boolean}
     */
    isSuuforestSource = false;
    
    /**
     * is Image in remote host
     * @type {boolean}
     */
    isRemoteHostSource = false;
    
    /**
     * is Image in s3 storage
     * @type {boolean}
     */
    isS3Storage = false;
    
    /**
     * Source loaded
     * @type {{}}
     */
    sourceloaded = {};
    
    /**
     * Is cached
     * @type {boolean}
     */
    isCached = false;
    
    /**
     * Is source in database
     * @type {boolean}
     */
    isSourceInDatabase = false;
    
}

export default Baseimage;