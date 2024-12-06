import suu from 'suu';
import util from 'node:util';

function test_func(a1, a2){
    console.log('A1: ' + a1);
    console.log('A2: ' + a2);
}

let test_func_promise = util.promisify(test_func);

console.log('Typeof:', typeof test_func_promise);
console.log('is Async Function:', test_func_promise.toString());
let result = test_func_promise(1, 2);
console.log('Result:', result);