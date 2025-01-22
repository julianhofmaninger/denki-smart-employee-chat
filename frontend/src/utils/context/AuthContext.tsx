import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { axiosInstance } from "../../config/axios";
import { GetTokenDto } from "../../data/dtos/AuthDto";

export type AuthContextType = {
    token: GetTokenDto | null;
    setToken: (newToken: GetTokenDto) => void;
    logout: () => void;
  };

export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
    logout: () => {},
});

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // State to hold the authentication token
  const [token, setToken_] = useState<GetTokenDto | null>(localStorage.getItem("denki_token") === null ? null : JSON.parse(localStorage.getItem("denki_token") as string));

  // Function to set the authentication token
  const setToken = (newToken: GetTokenDto) => {
    setToken_(newToken);
  };
  const logout = () => {
    setToken_(null);
    localStorage.removeItem("denki_token");
  }

  useEffect(() => {
    if (token) {
      axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + token.AccessToken;
      localStorage.setItem("denki_token", JSON.stringify(token));
    } else {
      delete axiosInstance.defaults.headers.common["Authorization"];
      localStorage.removeItem("denki_token");
    }
  }, [token]);

  

  // Memoized value of the authentication context
  const contextValue = useMemo(
    () => ({
      token,
      setToken,
      logout,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;