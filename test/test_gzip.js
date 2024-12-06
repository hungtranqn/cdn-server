import 'suu';

let __dir = suu.fileURLToDirname(import.meta.url);
let inputfile = suu.path.join(__dir, 'data', 'test.png');
let outputfile = suu.path.join(__dir, 'data', 'test.png.gz');

console.log('dir', __dir);
console.log('inputfile', inputfile);
console.log('outputfile', outputfile);

await suu.fs.gzipFile(inputfile, outputfile);

console.log('done: ', outputfile);