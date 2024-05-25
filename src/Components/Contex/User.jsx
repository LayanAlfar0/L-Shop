import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('userToken'));
    const [userName, setUserName] = useState(null);
    const getUserData = () => {
        if (userToken != null) {
            const decoded = jwtDecode(userToken);
            setUserName(decoded.userName);
        }
    };
    useEffect(
        () => {
            getUserData();
        },
        [userToken]
    );
    const [id,setId]=useState();
    
    return <UserContext.Provider value={{ userToken, userName, setUserName, setUserToken }}>{children}</UserContext.Provider>

}
export default UserContextProvider;