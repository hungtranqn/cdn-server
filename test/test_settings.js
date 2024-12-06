class ProxyExtendable{
    
    settings = {};
    
    constructor(){
        let ret = new Proxy(this, {
            get: function(target, name){
                console.log("get", name);
                return target.get(name);
            },
            
            set: function(target, name, value){
                console.log("set", name);
                target.set(name, value);
                return true;
            },
            
        });
        
        return ret;
    }
    
    get(name){
        return this.settings[name];
    }
    
    set(name, value){
        this.settings[name] = value;
    }
    
}

let test = new ProxyExtendable();

console.log(test);

test.times = Date.now();
console.log(test.times);
console.log(test.getSettings());