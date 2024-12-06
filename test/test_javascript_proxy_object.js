let configs = {
    
    name: 'app name',
    module: 'app module',
    version: 'app version',
    description: 'app description',
    author: 'app author',
    
};

let app = new Proxy(configs, {
    get: function(target, key, receiver){
        if(target[key] === undefined){
            return null;
        }
        
        return target[key];
    }
});

let value = app.name2;
let configvalue = configs.name2;

console.log('Type of: ', typeof value);
console.log('Value: ', value);
console.log('Value Config: ', configvalue);