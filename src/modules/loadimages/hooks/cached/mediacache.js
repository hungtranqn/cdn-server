const debug = suu.createDebug('suu:loadimages:hook:cached');
import modelmediacache from "#models/mediacache.js";

suu.on({
    
    querylists: [],
    
    /**
     * Save image to database
     */
    'loadimages:cache:hit': async(req, res, data) => {
        suu.submit('contentmanager:saveimage', {
            queryid: data.queryid,
            imageid: req.image.imageid,
            queryurl: req.image.url,
            urlpath: req.image.urlpath,
            filetype: data.ext,
            filename: req.image.imagename,
            cachefilepath: data.cachefilepath
        });
    },
    
    /**
     * Save image to database
     */
    'loadimages:cache:save': async(req, res, data) => {
        if(res.statusCode !== 200){
            return;
        }
        
        if(req.method !== 'GET'){
            return;
        }
        
        if(debug.enabled) debug("Save request cache", {
            cachefilepath: data.cachefilepath,
            urlpath: data.urlpath,
            filesize: data.data.length,
            filetype: data.ext,
        });
        
        await modelmediacache.addCache({
            queryid: data.queryid,
            imageid: req.image.imageid,
            data: data.data,
            queryurl: data.url,
            urlpath: data.urlpath,
            filetype: data.ext,
            filesize: data.data.length,
            filename: data.image.imagename,
            cachefilepath: data.cachefilepath
        });
    },
    
});