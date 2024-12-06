import CleanMediaContentHelper from '#loadimages/helper/cleanmediacontenthelper.js';
import log_error from "suu/core/logger.js";
const debug = suu.createDebug('suu:loadimages:contentmanager');

const scheduletimes = 1000 * 60 * 5; //5 minutes

//Content manager
export default async function(){
    do{
        try{
            debug('Run clean media content');
            await CleanMediaContentHelper.cleanifrequired();
            await suu.sleep(scheduletimes);
        }catch(e){
            log_error(e);
        }
    }while(true)
}