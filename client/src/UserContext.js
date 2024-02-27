import { createContext, useState } from "react";
const UserData = createContext();

export const UserProvider = ({children})=>{


    const [Admin,setAdmin] = useState();
    const [user, setUser] = useState({});

    const changeUser = (newUser)=>{
        setUser(newUser);
    }
 
    return (
        <UserData.Provider value={{user,changeUser,Admin,setAdmin}}>
            {children}
        </UserData.Provider>
    )
}

export default UserData;