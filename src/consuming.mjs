import setText, {appendText, showWaiting, hideWaiting} from "./results.mjs";

export function get() {
    axios.get('http://localhost:3000/orders/1')
        .then((data) => {
            setText(JSON.stringify(data));
        })
}

export function getCatch() {
    axios.get('http://localhost:3000/orders/123').
        then(data => setText(JSON.stringify(data))).
        catch(response => {
            setText(JSON.stringify(response.message))
        });
}

export function chain() {
    axios.get('http://localhost:3000/orders/1').
        then(response => {
            return axios.get('http://localhost:3000/addresses/' + response.data.shippingAddress);
        }).then(response => {
            setText(JSON.stringify(response));
        }).catch(error => setText(error));
    
}

export function chainCatch() {
    axios.get('http://localhost:3000/orders/1').
        then(response => {
            return axios.get('http://localhost:3000/addresses/' + response.data.shippingAddress);
        }).then(response => {
            setText(JSON.stringify(response));
        }).catch(error => setText(error));
}

export function final() {
    showWaiting();
    axios.get('http://localhost:3000/orders/12').
        then(response => {
            return axios.get('http://localhost:3000/addresses/' + response.data.shippingAddress);
        }).then(response => {
            setText(JSON.stringify(response));
        }).catch(error => setText(error)).
            finally(() => hideWaiting());
}