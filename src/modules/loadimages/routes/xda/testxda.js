const debug = suu.createDebug('suu:loadimages:routes:xda');

/**
 * Route load images
 * @param {Request} req
 * @param {Response} res
 */
export default async function loadMediaRequest(req, res){
    try{
        res.send('Load media xda');
    }catch(e){
        suu.log_error(e);
    }finally{
        debug('Dispatch load media request complete');
        if(!res.isSent){
            res.status(404);
            res.send('Not found');
        }else{
            debug('Response already sent');
        }
    }
}