const url = 'ws://stocks.mnet.website';
const PAGE_REFRESH_TIME = 1 * 1000;

export default class Connection {

    constructor() {
        this.client = null;
        this.reconnect = true;
        
    }

    connect = (callback) => {

        if(!callback){
            throw Error('Callback is required');
        }
        this.client = new WebSocket(url);
        this.client.onmessage = (message) => {
            callback && message && message.data && debounce(callback(JSON.parse(message.data)), PAGE_REFRESH_TIME);
        };    
        this.client.onclose = () => {
            setTimeout(() => {
                this.reconnect && this.connect(callback);
            }, PAGE_REFRESH_TIME);
        }
        this.client.onerror = () => {
            this.client && this.client.close();
        }
    }
    
    disconnect = () => {
        this.reconnect = false;
        this.client && this.client.close();
    }

    shouldReconnect = (reconnect) => {
        this.reconnect = reconnect;
    }
}


function debounce(func, timeout) {  
    let timer = null;  
    return (...args) => {    
        clearTimeout(timer);    
        timer = setTimeout(() => {      
            func(...args);    
        }
        ,timeout);  
    };
}

