import { SetStateAction, useEffect, useState } from "react";
import TextArea from "../../components/default-components/text-area/text-area";
import { axiosInstance } from "../../config/axios";
import { getConfig } from "../../config/config";
import { GetMessageDto } from "../../data/dtos/MessageDtos";
import { useAuth } from "../../utils/context/AuthContext";
import Message from "./components/message";
import { useSearchParams } from "react-router-dom";
import Connector from "../../config/signalr/connection";

const Chat = () => {

    const auth = useAuth();

    const [messages, setMessages] = useState<GetMessageDto[]>([]);
    const [receiverId, setReceiverId] = useState<string>("");
    const loadMessages = async (receiverId: string) => {
        
        let response = await axiosInstance.get(`${getConfig().api.url}/Message/List/${auth.token?.Employee.Id}/${receiverId}`);
        let messages = response.data.Results as GetMessageDto[];
        setMessages(messages);
    }

    const [searchParams] = useSearchParams();
    useEffect(() => {
        
        let receiverIdId = searchParams.get("receiverId");
        if(receiverIdId !== null){
            setReceiverId(receiverIdId);    
             loadMessages(receiverIdId);
            }
    }, [searchParams])

    const { newMessage, events, connectionId } = Connector();
    const handleClient = async(cId: string | null) => {
        try{

            let response = await axiosInstance.get(`${getConfig().api.url}/Client`);
            if(response.status === 404){
                console.log("here");
                await axiosInstance.post(`${getConfig().api.url}/Client`, {ClientId: cId, EmployeeId: auth.token?.Employee.Id});
                return;
            }
            let clientId = response.data.ClientId;
            let id = response.data.Id;
            if(clientId === null && cId !== null){
                await axiosInstance.post(`${getConfig().api.url}/Client`, {ClientId: cId, EmployeeId: auth.token?.Employee.Id});
            }
            else if(clientId !== null && cId !== null && clientId !== cId){
                await axiosInstance.put(`${getConfig().api.url}/Client`, {Id: id, ClientId: cId, EmployeeId: auth.token?.Employee.Id});
            }
        }
        catch(e){
            await axiosInstance.post(`${getConfig().api.url}/Client`, {ClientId: cId, EmployeeId: auth.token?.Employee.Id});
        }

    }
    useEffect(() => {
        handleClient(connectionId());
    }, [connectionId()]);
    useEffect(() => {
        events((_: any, message: SetStateAction<string>) => { setMessages([...messages, JSON.parse(message.toString())]); });
    });



    return (
        <div className="flex flex-col h-[98vh]">
            <div className="flex flex-col gap-4 flex-grow max-h-[90vh] overflow-scroll">
                {
                    messages.map((message, index) => {
                        return <Message isOwnMessage={message.SenderId === auth.token?.Employee.Id} message={message} key={index} />
                    })
                }
            </div>
            <div className="sticky flex gap-2 bottom-0overflow-clip">
                <TextArea receiverId={receiverId} setMessages={setMessages} messages={messages}/>
            </div>
        </div>
    );
}
export default Chat;