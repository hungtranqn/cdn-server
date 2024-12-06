import pathToRegexp from "path-to-regexp";

let path = "-w:width([\\d]+)h:height([\\d]+):type:crop([\\d]+)(-wm:watermark(.+)-q:quality([\\d]+)-f:format([\\w]+))?";
let str = "-w1500h1500c0-wm5";

let keys = [];
const regexp = pathToRegexp(path, keys);
let result = regexp.exec(str);

console.log("Pregx: ", regexp);
console.log("Path: ", path);
console.log("Keys: ", keys);
console.log("Match Results: ", result);