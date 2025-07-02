import setText, { appendText } from "./results.mjs";

export function timeout(){
    const wait = new Promise((resolve, reject) => {
        setTimeout(function() {
            reject('rejected promise!');
        }, 1500);
    });
    wait.then((response)=> setText(response)).catch((err) => setText(err));
}

export function interval(){
    let count = 0;
    const wait = new Promise((resolve, reject) => {
        setInterval(() => {
            console.log('interval');
            resolve('resolved promise!' + count++);
        }, 1500);
    });
    wait
        .then((response) => setText(response))
        .finally(() => {
            appendText('-done');
        });
}

export function clearIntervalChain(){
    let interval;
    const wait = new Promise(function(resolve, reject) {
        interval = setInterval(function() {
            console.log('interval');
            resolve('resolved promise!');
        }, 1500);
    });

    wait
        .then((response) => {
            setText(response);
        }).finally(() => {
            appendText('-done!');
            clearInterval(interval);
        });
}

export function xhr(){
}

export function allPromises(){
}

export function allSettled(){
}

export function race(){
}