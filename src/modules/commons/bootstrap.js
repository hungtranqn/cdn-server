const debug = suu.createDebug('suu:commons:bootstrap');

//Configs
import {STORAGE_MEDIA_PATH, CACHE_MEDIA_PATH} from '#commons/configs/configs.js';

class Bootstrap{
    
    /**
     * Init bootstrap
     */
    async init(){
        debug('Init bootstrap');
        
        //Setup paths
        await Promise.all([
            this.setupPaths(),
        ]);
        
        return this;
    }
    
    /**
     * Setup paths
     */
    async setupPaths(){
        debug('Setup paths');
        suu.fs.ensureDir(STORAGE_MEDIA_PATH);
        suu.fs.ensureDir(CACHE_MEDIA_PATH);
    }
    
}

//Load bootstrap
let boot = new Bootstrap();
await boot.init();

export default boot;