import { LockOpenIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CardOverlay } from "../../components/default-components/card-overlay/card-overlay";
import { IconButton, IconButtonProps } from "../../components/default-components/icon-button/icon-button";
import { Input, InputProps } from "../../components/default-components/input/input";
import { useShowToast } from "../../components/default-components/toast/toast";
import { axiosInstance } from "../../config/axios";
import { getConfig } from "../../config/config";
import { GetTokenDto, PostLoginDto } from "../../data/dtos/AuthDto";
import Footer from "../../layouts/footer";
import { colors } from "../../theme/colors";
import { useAuth } from "../../utils/context/AuthContext";
import { handleEnterKeyPress } from "../../utils/keyHandler";
import './authentication.scss';

function AuthenticationLayout() {
    const showToast = useShowToast();
    const navigate = useNavigate();
    const { token, setToken } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (token !== null)
            navigate("/home", { replace: true });
    }, [token])

    const login = async () => {
        setIsLoading(true);
        try {
            if (!username || !password) throw Error("Benutzername sowie Passwort sind Pflichtfelder");
            let user: PostLoginDto = {
                Username: username,
                Password: password
            }
            let response = await axiosInstance.post(`${getConfig().api.url}/Auth/Login`, user)
            let token = response.data as GetTokenDto;
            setToken(token);
        }
        catch (error) {
            showToast("failure-login", "Fehler beim Anmelden", "Benutzername oder Passwort ist falsch. Bitte versuchen Sie es erneut.", "error");
        }
        finally {
            setIsLoading(false);
        }
    }
    const handleChangePassword = (input: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(input.currentTarget.value);
    }

    const passwordInputProps: InputProps = {
        autoComplete: "current-password",
        placeholder: "Passwort",
        type: hidePassword ? "password" : "text",
        value: password,
        onChange: handleChangePassword,
        onKeyDown: handleEnterKeyPress(login)
    };
    const handleChangeUsername = (input: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(input.currentTarget.value);
    }
    const usernameInputProps: InputProps = {
        autoComplete: "username",
        placeholder: "Benutzername",
        type: "text",
        value: username,
        onChange: handleChangeUsername,
        onKeyDown: handleEnterKeyPress(login)
    };
    const loginButtonProps: IconButtonProps = {
        fontSize: colors.fontSizeBg,
        onClick: login,
        startIcon: <LockOpenIcon height={colors.fontSizeHeader} color={colors.onPrimaryText} width={colors.fontSizeHeader} />,
        color: colors.onPrimaryText,
        isLoading: isLoading,
        text: "Anmelden"
    };
    return (
        <>
            <div className="authentication-background"></div>
            <div className="authentication-container">
                <div className="authentication-header-container">
                    <div className="authentication-header-inner-container">
                        <h1 className="header-welcome">Wilkommen zurück</h1>
                        <p className="description">Diese Demo-Anwendung soll die Fähigkeit von AI-Systemen Chats zwischen Mitarbeitern zu klassifizieren demonstrieren.</p>
                    </div>
                </div>
                <section id="login-form" className="authentication-login-form-container">
                    <CardOverlay borderRadius={"28px"} width="100%" height="100%">
                        <div className="authentication-login-form-inner-container">
                            <h3 className="authentication-login-form-header">Anmelden</h3>
                            <form className="authentication-login-form">
                                <Input {...usernameInputProps} />
                                <div x-data="{ show: true }" className="authentication-password-container">
                                    <Input {...passwordInputProps} />
                                    <div className="password-hide-and-show-icons-container">
                                        {
                                            hidePassword ?
                                                <svg onClick={() => setHidePassword(false)} className="password-icon" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 576 512">
                                                    <path fill="currentColor"
                                                        d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z">
                                                    </path>
                                                </svg>
                                                :
                                                <svg onClick={() => setHidePassword(true)}
                                                    className="password-icon" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 640 512">
                                                    <path fill="currentColor"
                                                        d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z">
                                                    </path>
                                                </svg>
                                        }
                                    </div>
                                </div>
                                <div>
                                    <IconButton {...loginButtonProps} />
                                </div>
                            </form>
                        </div>
                    </CardOverlay>
                </section>
            </div>
            <svg className="authentication-bottom-background-overlay" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 300"><path fill={colors.background} fillOpacity="1" d="M0,0L40,42.7C80,85,160,171,240,197.3C320,224,400,192,480,154.7C560,117,640,75,720,74.7C800,75,880,117,960,154.7C1040,192,1120,224,1200,213.3C1280,203,1360,149,1400,122.7L1440,96L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z"></path></svg>
            <Footer />
        </>
    );

}

export default AuthenticationLayout;