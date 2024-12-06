import suu from 'suu';

//Parse process argv
import yargs from 'yargs';
import cluster from "cluster";
import os from 'os';

const argv = yargs(process.argv).argv;

console.log('Child Env: ', process.env);
console.log('Child Args:', argv);

if(cluster.isPrimary){
    console.log('I am the primary process');
    cluster.fork();
}else{
    console.log('I am the woker process');
}