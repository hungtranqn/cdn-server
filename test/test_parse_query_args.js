import suu from 'suu';
import parsequeryargs from "#commons/utils/parsequeryargs.js";

let str = 'w-500-mh-1500-thumb-wm-tyhy-pk-5';

let args = parsequeryargs(str);

console.log('Test str: ', str);
console.log(args);