import 'suu/bootstrap';

import {Worker} from 'worker_threads';
import {fileURLToPath} from "url";
import {dirname} from "path";
import cluster from "cluster";

let __file = dirname(fileURLToPath(import.meta.url)) + '/test_nextticks.js';

if(cluster.isPrimary){
    cluster.fork();
}else{
    let numthreads = 4;
    for(let i = 0; i < numthreads; i++){
        
        const thread = new Worker(__file, {
            workerData: {
                hello: 'world' + i
            }
        });
        
        threads.push(thread);
        thread.on('message', (message) => {
            console.log('message:', message);
        });
        
        thread.on('error', (err) => {
            console.log('error:', err);
        });
        
        thread.on('exit', (code) => {
            if(code !== 0){
                console.log('exit code:', code);
            }
        });
        
    }
    
}