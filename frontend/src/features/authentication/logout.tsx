import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/context/AuthContext";

const Logout = () => {

    const navigate = useNavigate();
    const auth = useAuth();

    useEffect(() => {
        auth.logout(); 
        navigate("/")
    }, [])

    return(
        <></>   
    )
}

export default Logout;