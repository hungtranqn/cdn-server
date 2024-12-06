import './init.js';
import mimetype from "mime-types";

let filepath = '/home/suusgd/projects/mediaserver/test/data/test.png';

let type = mimetype.lookup(filepath);

console.log(type);