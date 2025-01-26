import { Avatar } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { GetEmployeeDto } from "../../../data/dtos/EmployeeDtos";

interface ChatPreviewProps {
    employee: GetEmployeeDto;
    message: string;
}

const ChatPreview = (props: ChatPreviewProps) => {

    const { message } = props;
    const navigate = useNavigate();

  return (
    <div className="p-2  hover:bg-secondaryHover cursor-pointer" onClick={() => { navigate(`/home?receiverId=${props.employee.Id}`); }}>
      <div className="flex gap-3 items-center">
        <Avatar name={props.employee.Firstname + " " + props.employee.Lastname} />
        <div className={`fit-content flex items-center justify-between w-[70%] p-2 rounded-md`}>
          <p className={`text-md max-w-[100%] truncate text-ellipsis font-bold`}>{message}</p>
        </div>
      </div>
    </div>
  );
};
export default ChatPreview;
