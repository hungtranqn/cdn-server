import suu from "suu";
import dns from "dns";

const debug = suu.createDebug('test:http:get');

let url = 'https://ljalksd.com';

try{
    
    let host = await dns.promises.resolve('ljalksd.com');
    console.log(host);
    
    debug('Get url', url);
    let response = await suu.http.get(url, {
        timeout: 20000
    });
    debug(response);
}catch(e){
    debug(e);
}