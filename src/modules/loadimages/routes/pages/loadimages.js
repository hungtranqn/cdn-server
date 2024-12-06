const debug = suu.createDebug('suu:loadimages:routes');
import LoadImageController, {PATH_ROUTES} from "#loadimages/controllers/pages/loadimagecontroller.js";

debug('Load media routes');

//Route methods
export const ROUTE_METHODS = 'get';

//Path routers
export {PATH_ROUTES};

/**
 * Route load images
 * @param {express.Request} req
 * @param {Response} res
 */
export default async function loadMediaRequest(req, res){
    req.dispatch(new LoadImageController(req, res), 'loadimage');
}