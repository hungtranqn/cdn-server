import lodash from "lodash";

let url = 'https://www--google--com/uploadpath/filename.jpg?a=1&b=2#hash';

let rl = lodash.replace(url, /--/g, '.');

console.log('Before replace', url);
console.log('After replace',rl);