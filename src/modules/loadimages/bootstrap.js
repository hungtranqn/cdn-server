//Create require
const debug = suu.createDebug('suu:loadimages:bootstrap');

/**
 * Bootstrap
 */
class Bootstrap{
    
    /**
     * Init bootstrap
     */
    async init(){
    
    }
    
    /**
     * Setup routes
     */
    setupWebserver(){
        debug('Setup webserver');
        
        //Setup webserver here
    }
    
}

let boot = new Bootstrap();
await boot.init();

export default boot;