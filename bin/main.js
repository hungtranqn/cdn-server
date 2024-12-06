//Load suu app
import {fileURLToPath} from 'url';
import path from 'path';

//get current working directory & main file
process.__mainfilename = fileURLToPath(import.meta.url);
process.__basedir = path.resolve(path.join(path.dirname(process.__mainfilename), '..'));

try{
    //Start app
    let app = await import('suu/bootstrap');
    await app.default.start();
}catch(e){
    console.log('Error', e);
}