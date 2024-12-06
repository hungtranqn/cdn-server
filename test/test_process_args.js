//Parse process argv
import yargs from 'yargs';

const argv = yargs(process.argv).argv;

console.log('Env: ', process.env);
console.log('Args:', argv);