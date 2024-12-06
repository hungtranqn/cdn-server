import 'suu';
import {Worker, isMainThread, workerData, parentPort, threadId} from 'worker_threads';

let times = 0;
export default function test_thread_times(t){
    if(t){
        times = t;
    }
    
    times++;
    
    console.log('call in threadId:', threadId, ' times: ', times);
    
    return times;
}