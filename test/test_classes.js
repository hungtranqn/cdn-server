import lodash from "lodash";

class classname{
    
    constructor(){
        console.log('constructor');
    }
    
    static teststatic(){
        console.log('test static');
        this.testmode2();
    }
    
    testmode(){
        console.log('test code');
        classname.teststatic();
    }
    
    testmode2(){
        console.log('test mode 2');
    }
    
}

console.log('Type name: ', typeof classname);
console.log('Class name: ', classname.constructor.name);
console.log('Static Method: ', classname.teststatic.name);
console.log('Keys: ', Object.keys(classname.prototype));

classname.teststatic();

let obj = new classname();
obj.testmode();