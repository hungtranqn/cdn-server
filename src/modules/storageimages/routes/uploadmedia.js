const debug = suu.createDebug('suu:storageimages:routes');
import uploadmediacontroller from "#storageimages/controllers/uploadmediacontroller.js";
import uploadfilecontroller from "#storageimages/controllers/uploadfilecontroller.js";

/**
 * Setup routes
 * @param {Router} router
 */
export default function LoadMediaRouter(router){
    debug('Load media routes');
    
    /**
     * Load image
     * @param {Request} req
     * @param {Response} res
     */
    router.post('/xda/uploadmedia', loadMediaRequest);
    router.post('/xda/uploadfile', loadMediaFile);
    
    /**
     * Route load images
     * @param {Request} req
     * @param {Response} res
     */
    async function loadMediaRequest(req, res){
        let controller = new uploadmediacontroller(req, res);
        return controller.getUrlimage();
    }
    
    async function loadMediaFile(req, res){
        let controller = new uploadfilecontroller(req, res);
        return controller.getFileImage();
    }
    
}