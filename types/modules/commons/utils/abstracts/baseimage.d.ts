export default Baseimage;
/**
 * Base image
 */
declare class Baseimage {
    /**
     * Is initialized
     * @param source
     */
    isInitialized: boolean;
    /**
     * Parse url
     * @type {string}
     */
    url: string;
    /**
     * Url path
     * @type {null}
     */
    urlpath: null;
    /**
     * Url path id
     * @type {null}
     */
    urlpathid: null;
    /**
     * Current Uri of url
     * @type {Uri}
     */
    uri: Uri;
    /**
     * Source url
     * @type {Uri}
     */
    sourceuri: Uri;
    /**
     * Source url
     * @type {string}
     */
    sourceurl: string;
    /**
     * Source url id.
     * Md5 of source url
     * @type {string}
     */
    sourceid: string;
    /**
     * Http protocol
     * @type {string}
     */
    protocol: string;
    /**
     * Image host key
     * @type {string}
     */
    imagehostkey: string;
    /**
     * Image host
     * @type {string}
     */
    imagehost: string;
    /**
     * Image path
     * @type {string}
     */
    imagepath: string;
    /**
     * File name
     * @type {null}
     */
    imagename: null;
    /**
     * Image size
     * @type {number
     */
    size: number;
    /**
     * Image query
     * @type {number}
     */
    width: number;
    /**
     * Image height
     * @type {Number}
     */
    height: number;
    /**
     * Image max width
     * @type {number}
     */
    maxwidth: number;
    /**
     * Image max height
     * @type {string}
     */
    maxheight: string;
    /**
     * Image quality
     * @type {null}
     */
    quality: null;
    /**
     * File extension
     * @type {null}
     */
    extension: null;
    /**
     * Thumbnail
     * @type {null}
     */
    thumbnail: null;
    /**
     * Watermark
     * @type {string}
     */
    watermark: string;
    /**
     * Crop
     * @type {Boolean}
     */
    crop: boolean;
    /**
     * Border
     * @type {string|number
     */
    border: string | number;
    /**
     * Background
     * @type {string|number}
     */
    background: string | number;
    /**
     * Type
     * @type {string}
     */
    type: string;
    /**
     * Put image to left top
     * @type {string}
     */
    imagetopleft: string;
    /**
     * Put image to right top
     * @type {string}
     */
    imagetopright: string;
    /**
     * Put image to left bottom
     * @type {string}
     */
    imagebottomleft: string;
    /**
     * Put image to right bottom
     * @type {string}
     */
    imagebottomright: string;
    /**
     * Put image to center
     * @type {string}
     */
    imagecenter: string;
    /**
     * Package
     * @type {number}
     */
    package: number;
    /**
     * Mime type
     * @type {string}
     */
    mimetype: string;
    /**
     * Source load type
     * @type {string}
     */
    sourceloadtype: string;
    /**
     * Begin load source time
     * @type {number}
     */
    beginloadsourcetime: number;
    /**
     * End load source time
     * @type {number}
     */
    endloadsourcetime: number;
    /**
     * Check source is storage on suuforest server
     * @type {boolean}
     */
    isSuuforestSource: boolean;
    /**
     * is Image in remote host
     * @type {boolean}
     */
    isRemoteHostSource: boolean;
    /**
     * is Image in s3 storage
     * @type {boolean}
     */
    isS3Storage: boolean;
    /**
     * Source loaded
     * @type {{}}
     */
    sourceloaded: {};
    /**
     * Is cached
     * @type {boolean}
     */
    isCached: boolean;
    /**
     * Is source in database
     * @type {boolean}
     */
    isSourceInDatabase: boolean;
}
