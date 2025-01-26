import { Avatar } from "@chakra-ui/react";
import { GetMessageDto } from "../../../data/dtos/MessageDtos";
import { axiosInstance } from "../../../config/axios";
import { getConfig } from "../../../config/config";
import { GetEmployeeDto } from "../../../data/dtos/EmployeeDtos";
import { useEffect, useState } from "react";

interface MessageProps {
    message: GetMessageDto;
    isOwnMessage: boolean;
}

const Message = (props: MessageProps) => {

    const { message, isOwnMessage } = props;


    const [sender, setSender] = useState<GetEmployeeDto | null>(null);
    const [receiver, setReceiver] = useState<GetEmployeeDto | null>(null);
    const loadEmployees = async () => {
        
        let response = await axiosInstance.get(`${getConfig().api.url}/Employee/${message.SenderId}`);
        let senderData = response.data as GetEmployeeDto;
        setSender(senderData);

        response = await axiosInstance.get(`${getConfig().api.url}/Employee/${message.ReceiverId}`);
        let receiverData = response.data as GetEmployeeDto;
        setReceiver(receiverData);
    }

    useEffect(() => {
        if(message.SenderId !== null && message.ReceiverId) loadEmployees();

    }, [])
    

  return (
    <div className={`flex flex-col ${isOwnMessage ? "ml-[50%]" : ""} ${isOwnMessage ? "items-end" : "items-start"} w-[50%]`}>
      <div className="flex gap-3 items-center">
        {
          !isOwnMessage ? 
            <>
              <Avatar name={sender === null ? "" : sender.Firstname + " " + sender.Lastname} />
              <div className={`fit-content max-w-[100%] ${isOwnMessage ? "bg-primary" : "bg-gray-300"} p-2 rounded-md`}>
                <p className={`text-md ${isOwnMessage ? "text-onPrimaryText" : "text-text"}`}>{message.Text}</p>
              </div>
            </>
            :
            <>
              <div className={`fit-content max-w-[100%] ${isOwnMessage ? "bg-primary" : "bg-gray-300"} p-2 rounded-md`}>
                <p className={`text-md ${isOwnMessage ? "text-onPrimaryText" : "text-text"}`}>{message.Text}</p>
              </div>
              <Avatar name={receiver === null ? "" : receiver.Firstname + " " + receiver.Lastname} />
            </>
        }
      </div>
    </div>
  );
};
export default Message;
