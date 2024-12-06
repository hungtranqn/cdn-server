/**
 * Image to host
 */

class ImageToHosts{
    /**
     * Image host
     * @type {Object}
     */
    imagehosts = null;
    
    isInitialized = false;
    
    /**
     * Initialize
     */
    async init(){
        if(this.isInitialized){
            return true;
        }
        
        //Load image hosts from settings
        this.imagehosts = await suu.settings.load('imagehosts', false);
        this.isInitialized = true;
        
        return true;
    }
    
    /**
     * get host name
     * @param name
     */
    async getHost(name){
        if(!this.isInitialized){
            await this.init();
        }
        
        if(this.imagehosts[name]){
            return this.imagehosts[name].host;
        }
        
        return null;
    }
    
    /**
     * get Host service name
     * @param name
     * @return {Promise<void>}
     */
    async getService(name){
        if(!this.isInitialized){
            await this.init();
        }
        
        if(this.imagehosts[name]){
            return this.imagehosts[name].service;
        }
        
        return null;
    }
    
}

export default new ImageToHosts();