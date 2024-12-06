const debug = suu.createDebug('suu:test:routes');
import LoadImageController from "#loadimages/controllers/pages/loadimagecontroller.js";
export default [
    {
        route: '/test',
        method: 'get',
        controller: LoadImageController,
        action: 'getTest',
    }
];