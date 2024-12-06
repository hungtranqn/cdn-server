import 'suu/bootstrap';
import {Worker, isMainThread, workerData, parentPort, threadId} from 'worker_threads';

console.log('isMainThread:', isMainThread);
console.log('workerData:', workerData);
console.log('threadId:', threadId);

console.log('sub thread');
parentPort.postMessage({hello: 'world'});
parentPort.on('message', (message) => {
    console.log('message:', message);
});