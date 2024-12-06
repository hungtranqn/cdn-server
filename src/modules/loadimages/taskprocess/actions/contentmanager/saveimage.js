import modelmediacache from "#models/mediacache.js";
const debug = suu.createDebug('suu:loadimage:contentmanager:saveimage');

//Content manager
export default async function(data){
    
    if(debug.enabled){
        debug("Save cache access times", data.queryid);
    }
    
    try{
        let cached = await modelmediacache.getCache(data.queryid);
        if(!cached){
            let filesize = await suu.file.getFileSize(data.cachefilepath);
            
            return await modelmediacache.addCache({
                queryid: data.queryid,
                imageid: req.imageid,
                queryurl: data.url,
                urlpath: data.urlpath,
                filetype: data.ext,
                filesize: filesize,
                filename: data.filename,
                cachefilepath: data.cachefilepath
            });
        }
        
        //update last access
        cached.lastaccess = Date.now();
        
        //save cache
        await cached.save();
    }catch(e){
        suu.log_error(e);
    }
};