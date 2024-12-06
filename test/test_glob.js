import {glob} from "glob";
import path from "path";
import {fileURLToPath} from 'url';

let __dirname = path.dirname(fileURLToPath(import.meta.url));

let items = glob.sync('**/*.*', {cwd: __dirname});

console.log(items);