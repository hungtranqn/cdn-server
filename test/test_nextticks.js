import async, {nextTick} from 'async';
import sharp from 'sharp';
import {fileURLToPath} from 'url';
import path from 'path';
import cluster from 'cluster';

async function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

let __dirname = path.dirname(fileURLToPath(import.meta.url));
let testfile = path.join(__dirname, 'data', 'test.png');

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

process.env.UV_THREADPOOL_SIZE = 64;

let tasks = 0;

/**
 * Call fn
 * @param tick
 * @param msg
 * @return {Promise<void>}
 */
async function resizeimage(ticket, times){
    tasks++;
    let begin = Date.now();
    let image = sharp(testfile);
    let newsize = randomInt(100, 1500);
    image.resize(newsize, undefined);
    let {info} = await image.toBuffer({resolveWithObject: true});
    let complete = Date.now() - begin;
    let now = Date.now();
    console.log(`Task: ${tasks} - Begin: ${begin} now: ${now} - Ticket: ${ticket} - complete: ${complete} ms - new width: ${info.width} new height: ${info.height}`);
}

for(let ticket = 0; ticket < 1000; ticket++){
    nextTick(async() => {
        let times = 0;
        while(true){
            await resizeimage(ticket, times++);
        }
    });
}