import { createContext, useState, useEffect } from "react";


const DataContext = createContext({});

export const DataProvider = ({ children }) => {
    const [login, setLogin] = useState(false)
    const [user, setUser] = useState(null)
   const [messages, setMessages] = useState([]);

    useEffect(() => {
        const isLogin = sessionStorage.getItem('loginData')
        if (isLogin) {
            setLogin(true)
            setUser(JSON.parse(isLogin))
        }
    }, [])

    return (
        <DataContext.Provider value={{
            login, setLogin, user, setUser,
            messages, setMessages
        }}>
            {children}
        </DataContext.Provider>
    );
};

export default DataContext;






/*
                       Използване на провайдъра
    import { useContext } from "react";
    import DataContext from '../../context/DataContext';
    const {cart} = useContext(DataContext)

  
                              



*/