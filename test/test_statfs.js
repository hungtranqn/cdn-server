import 'suu';

let result = await suu.fs.checkDiskspace('/var/lib');

for(let key in result){
    console.log(key, suu.filesizes.toGb(result[key]));
}