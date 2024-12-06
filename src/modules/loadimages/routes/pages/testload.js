import LoadImageController from '#loadimages/controllers/pages/loadimagecontroller.js';
export default {
    route: '/testload',
    method: 'get',
    controller: LoadImageController,
    action: 'loadimage',
    args: {
        url: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'
    }
};