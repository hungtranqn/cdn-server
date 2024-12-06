import 'suu/bootstrap';

import modelmediacontent from '#models/mediacontents.js';
const debug = suu.createDebug('test:models');

let uri = 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', data = 'Image contens data is here';

describe('Test Media contents', async function(){
    
    it('Add image', async function(){
        let addimage = await modelmediacontent.addImage({
            imageid: suu.md5(uri), url: uri, data
        });
        
        console.log('Add image: ', addimage);
    });
    
});