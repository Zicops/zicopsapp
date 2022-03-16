import { createContext, useState } from 'react';

export const userContext = createContext();

const UserContextProvider = (props) => {
    const [isAdmin, setAdmin] = useState(0);
    const [redirect, setRedirect] = useState('/admin');
    const makeAdmin = (data) => setAdmin(data)
    return (
        <userContext.Provider value={{ isAdmin, makeAdmin }}>
            {props.children}
        </userContext.Provider>
    );
}
    
export default UserContextProvider;