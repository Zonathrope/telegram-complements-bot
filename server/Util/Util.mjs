import * as fs from "fs";

export function timer(cb) {
    (function loop() {
        let now = new Date();
        if (now.getHours() === 12 && now.getMinutes() === 0) {
            cb();
        }
        now = new Date();                  // allow for time passing
        let delay = 60000 - (now % 60000); // exact ms to next minute interval
        setTimeout(loop, delay);
    })();
}

export async function msgWithDelay(callback){
    //initializing delay to send msg
    const delay = randomNumb(0, 86400000)
    setTimeout(async () =>{
       await callback()
    },delay)
}

export function randomNumb(min, max){
    return Math.trunc(Math.random() * max - min)
}

export async function readJson(filepath) {
    return JSON.parse(await fs.readFileSync(filepath))
}



