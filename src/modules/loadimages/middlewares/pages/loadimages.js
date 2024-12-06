import {CACHE_MEDIA_PATH} from "#commons/configs/configs.js";
import ParseImageUrl from "#commons/utils/parseimageurl.js";
import modelmediacache from "#models/mediacache.js";
import cachefilestorage from "#commons/utils/cachefilestorage.js";
import {MEDIA_CACHEABLE} from "#commons/configs/configs.js";
import {PATH_ROUTES} from "#loadimages/controllers/pages/loadimagecontroller.js";
export {PATH_ROUTES};


const debug = suu.createDebug('suu:loadimages:middleware');

/**
 * Add mediacacherequest middleware
 */
export default async function loadimages(req, res, next){
    
    if(!MEDIA_CACHEABLE){
        next();
        return;
    }
    
    try{
        let queryid = req.queryid,
            url     = req.requesturl;
        
        //parse query url
        let image = new ParseImageUrl(url);
        await image.parse();
        req.image = image;
        
        //Image extension
        let ext = image.extension;
        
        //Check file Id and load cache
        let cachefilepath = await cachefilestorage.getFileIdLocation(queryid, ext);
        
        //trigger event load cache
        suu.emit('loadimages:cache:load', req, res, {image, queryid, url, ext, cachefilepath});
        
        if(await suu.fs.pathExists(cachefilepath)){
            suu.go(() => res.sendStaticFile(cachefilepath, {
                exits: true,
            }));
            
            if(debug.enabled) debug("Send cache file: %s", cachefilepath);
            
            suu.emit('loadimages:cache:hit', req, res, {image, queryid, url, ext, cachefilepath});
            return;
        }
        
        //Trigger event load cache miss
        suu.emit('loadimages:cache:miss', req, res, {image, queryid, url, ext, cachefilepath});
        
        //Save cache if cache not exits
        let end = res.end;
        res.end = function(data){
            suu.emit('loadimages:cache:save', req, res, {data, image, queryid, url, ext, cachefilepath});
            end.call(res, data);
        }
        
        next();
        return;
    }catch(e){
        suu.log_error(e);
    }
    
    next();
}