import suu from "suu";
import {URL, parse as parseurl} from "url";
import Uri from "suu/uri/uri.js";

let str = 'https://www.google.com/uploadpath/filename.jpg';
let i = new Uri(str);
i.query = {dev: 10};

console.log('Uri: ', i);
console.log('Query: ', i.query);
console.log('Domain name: ' + i.domainname);