import 'suu';

let __dir = suu.fileURLToDirname(import.meta.url);
let outputfile = suu.path.join(__dir, 'data', 'put.txt.gz');

console.log('dir', __dir);
console.log('outputfile', outputfile);

let str = `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
As i have developped you, so you must understand one another.
I am the first person to understand me.
I am the second person to understand me.
I am the third person to understand me.
I am the fourth person to understand me.
I am the fifth person to understand me.
I am the sixth person to understand me.
I am the seventh person to understand me.
I am the eighth person to understand me.
I am the ninth person to understand me.
I am the tenth person to understand me.
I am the eleventh person to understand me.
I am the twelfth person to understand me.`;

await suu.fs.put_gz_contents(outputfile, str);

console.log('done: ', outputfile);