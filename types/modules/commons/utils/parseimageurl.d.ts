/**
 * Parse image url
 */
export default class ParseImageUrl {
    constructor(url: any);
    url: any;
    /**
     * Parse Url
     * @param url
     * @return {Promise<boolean>}
     */
    parse(url: any): Promise<boolean>;
    urlpath: any;
    urlpathid: any;
    uri: any;
    /**
     * Parse source url
     * @return {Promise<void>}
     */
    _parseSourceUrl(data: any): Promise<void>;
    protocol: any;
    imagehost: any;
    imagehostkey: any;
    isSuuforestSource: boolean;
    isRemoteHostSource: boolean;
    isS3Storage: boolean;
    imagepath: any;
    imagename: any;
    sourceuri: any;
    sourceurl: any;
    sourceid: any;
    /**
     * Parse image query to display clients
     * @param querystr
     * @return {Promise<boolean>}
     * @private
     */
    private _parseQuery;
    extension: any;
    mimetype: any;
}
