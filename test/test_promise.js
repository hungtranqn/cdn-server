let times = 0;

let tasks = [];

for(let i = 0; i < 10; i++) {
    tasks.push(new Promise((resolve, reject) => {
        process.nextTick(async () => {
            times++;
            console.log('test: ', times);
            resolve();
        });
    }));
}

console.log('test main', times);
await Promise.all(tasks);
console.log('after test main', times);