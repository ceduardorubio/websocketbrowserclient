let code = `
import { WebSocketBrowserClient } from "./ws-browser-client";

const websocketClientOptions = null;
const websocketClientLogger = null;
const websocketAuthCredentials = {
    //... your credentials
}

let globalUsers: User[] = [];

export const wsClient = new WebSocketBrowserClient(websocketClientOptions,websocketClientLogger);


// set what to do if authentication is successful
wsClient.whenConnected = () => {
    console.log('WebSocketClient Connected');
    // ... now you can use the client in other parts of your application
    let sessionData = wsClient.session
    // send a echo message to the server and wait for a response
    wsClient.echo({msg:'testing connection ...'},(error,response) => {
        console.log({error,response});
    });
    // send a request message to the server and wait for a response to get an array of users
    wsClient.request<User[]>('getUsers',{},(error,users) => {
        if(error) {
            console.log('Error:',error);
            return;
        } else {
            globalUsers = users;
        }
    });
    // join the group1 to receive messages from the server for this group
    wsClient.joinGroup('group1');
    // leave the group1
    wsClient.leaveGroup('group1');
    // leave all groups
    wsClient.leaveAllGroups();
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
wsClient.connectTo('ws://websocket-node-server-ip:port',websocketAuthCredentials);
`;

function tryTill(conditionCheck,execute){
    setTimeout(() => {
        if(conditionCheck()){
            execute();
        } else {
            tryTill(conditionCheck,execute);
        }
    }, 5);
}

let conditionCheck = () => {
    return window.VSCODE_TS !== undefined;
}

tryTill(conditionCheck,() => {
    window.VSCODE_TS(code,"code");
});


function request (url,cb){
    fetch(url).then((response) => {
        return response.json();
    }
    ).then((json) => {
        cb(json);
    });
}

request('https://api.npmjs.org/downloads/point/2023-04-1:2023-12-29/ws-browser-client',(json) => {
    console.log(json)    
document.getElementById('downloads').innerHTML = "(" + json.downloads + ")";

});