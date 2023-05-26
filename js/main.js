let code = `
import { WebSocketBrowserClient } from "ws-browser-client";

let options = null;
/*  default values
    options = {
        onConnectionErrorReconnect: true,
        authCallbackOnReconnect:true,
        reconnectionTimeout: 2_000
    }
*/

let Logger = null;
/*  default values
    Logger = {
        log: console.log,
        error: console.error,
        warn: console.warn,
        info: console.info,
        debug: console.debug
    }

    use this to log all incoming messages
*/
export const wsClient = new WebSocketBrowserClient(options,Logger);

let authCredentials = {
    //... your credentials
}
// set what to do if authentication is successful
wsClient.whenConnected = () => {
    console.log('WebSocketClient Connected');
    // ... now you can use the client in other parts of your application
    AfterConnectedProcedure();
};
// set what to do if authentication fails
wsClient.ifAuthenticationFails = (authenticationError) => {
    console.error({authenticationError});
}
// set what to do if connection is lost
wsClient.onConnectionError = (connectionLostError,connectionLostInfo) => {
    console.error({connectionLostError,connectionLostInfo});    
}

wsClient.onConnectionClosed = (connectionCloseError,connectionCloseEvent) => {
    console.log({connectionCloseError,connectionCloseEvent});
}
// execute the connection to the server
wsClient.connectTo('ws://localhost:8080',authCredentials);
`;



var editor = monaco.editor.create(document.getElementById('container'), {
    value:code,
    language: 'typescript',
    theme: 'vs-dark',
    minimap: {
        enabled: false
    },
    readOnly: true,
});