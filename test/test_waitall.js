let times;

async function testmain(){
    times++;
    console.log('testmain');
}

async function test1(){
    times++;
    console.log('test1', times);
}

async function test2(){
    times++;
    console.log('test2', times);
}

let tasks = [];

tasks.push(testmain());
tasks.push(test1());
tasks.push(test2());

await Promise.all(tasks);