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
    const categories = axios('http://localhost:3000/itemCategories');
    const status = axios('http://localhost:3000/orderStatuses');
    const userType = axios('http://localhost:3000/userTypes');

    Promise.all([categories, status, userType])
        .then(([categories, status, userType]) => {
        setText(JSON.stringify(categories.data));
        appendText(JSON.stringify(status.data));
        appendText(JSON.stringify(userType.data));
    }).catch((response) => {
        setText(response);
    });
}

export function allSettled(){
    const categories = axios('http://localhost:3000/itemCategories1');
    const status = axios('http://localhost:3000/orderStatuses');
    const userType = axios('http://localhost:3000/userTypes');

    Promise.allSettled([categories, status, userType])
        .then((value) => {
        let result = value.map(data => {
            if (data.status === 'fulfilled') {
                return `Fullfilled - ${JSON.stringify(data.value.data[0])}`;
            } else {
                return `Rejected - ${data.reason}`;
            }
        });
        setText(result);
    }).catch((response) => {
        setText(response);
    });
}

export function race(){
}