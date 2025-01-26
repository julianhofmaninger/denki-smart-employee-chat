import { useEffect, useState } from "react";
import { axiosInstance } from "../../config/axios";
import { getConfig } from "../../config/config";
import { GetFlaggedChatDto } from "../../data/dtos/FlaggedChatDtos";
import { CardOverlay } from "../../components/default-components/card-overlay/card-overlay";
import moment from "moment";

const FlaggedChats = () => {

    const [flaggedChats, setFlaggedChats] = useState<GetFlaggedChatDto[]>([]);

    const loadFlaggedChats = async () => {
        try {
            const response = await axiosInstance.get(`${getConfig().api.url}/FlaggedChat/List`);
            const data = response.data;
            const chats = data.Results;
            setFlaggedChats(chats);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        loadFlaggedChats();
    }, [])

    return(
        <div className="grid grid-cols-3 gap-3">
            {
                flaggedChats.map((chat, index) => (
                    <CardOverlay padding="10px" borderRadius="5px" width="100%" height="100%">
                        <p><span className="font-bold">Chat: </span>{chat.Employee.Firstname + " " + chat.Employee.Lastname} - {chat.Employee2.Firstname + " " + chat.Employee2.Lastname} vom {moment(chat.CreatedAt).format("DD.MM.yyyy")}</p>
                        <p><span className="font-bold">Konflikt Wahrscheinlichkeit: </span>{chat.ConflictPotential * 100}%</p>
                        <p><span className="font-bold">Inhalt kritscher Daten: </span>{chat.SenstivieLeak * 100}%</p>
                        {/* <p>{chat.ConSenstivieLeak}</p>
                        <p>{chat.CriticalPhrases}</p> */}
                    </CardOverlay>
                ))
            }
        </div>
    )
}

export default FlaggedChats;