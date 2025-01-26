import * as signalR from "@microsoft/signalr";
import { getConfig } from "../config";

const URL: string = getConfig().api.url + "/hub";
class Connector{
    private connection: signalR.HubConnection;
    public events: (onMessageReceived: (username: string, message: string) => void) => void;
    static instance: Connector;
    constructor(){
        this.connection = new  signalR.HubConnectionBuilder()
            .withUrl(URL)
            .withAutomaticReconnect()
            .build();

        this.connection.start().catch(err => console.error(err.toString()));
        this.events = (onMessageReceived: (username: string, message: string) => void) => {
            this.connection.on("ReceiveMessage", onMessageReceived);
        }
        
    }

    public newMessage = (messages: string) => {
        this.connection.send("newMessage", "user", messages).then(x => console.log("sent"));
    }
    public connectionId = () => {
        return this.connection.connectionId;
    
    }

    public static getInstance = () => {
        if(!Connector.instance){
            Connector.instance = new Connector();
        }
        return Connector.instance;
    }   
}

export default Connector.getInstance;