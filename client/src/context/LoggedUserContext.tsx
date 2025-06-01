import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";

interface userStructure {
    id: string;
    fname: string;
    mname: string;
    lname: string;
    username: string;
    email: string;
    user_type: string | null | undefined;
}

interface StateContextTypes {
    user: userStructure | null;
    token: string | null;
    userType: string | null;
    setUser: (user: userStructure | null) => void;
    setToken: (token: string | null) => void;
    setUserType: (userType: string | null) => void;
}

const LoggedUserContext = createContext<StateContextTypes>({
    user: null,
    token: null,
    userType: null,
    setUser: () => {},
    setToken: () => {},
    setUserType: () => {}
});

export const LoggedUserProvider = ({ children }: {children: ReactNode}) => {
    const [user, setUser] = useState<userStructure | null>(() => {
        const cookieUser = Cookies.get('USER');
        return cookieUser ? JSON.parse(cookieUser) : null;
    });
    
    const [token, setToken] = useState<string | null>(() => Cookies.get('ACCESS_TOKEN') || null);
    
    const [userType, setUserType] = useState<string | null>(() => Cookies.get('USER_TYPE') || null);

    useEffect(() => {
        // Check cookies initially
        const cookieUser = Cookies.get('USER');
        if (cookieUser) {
            setUser(JSON.parse(cookieUser));
        }

        const cookieToken = Cookies.get('ACCESS_TOKEN');
        if (cookieToken) {
            setToken(cookieToken);
        }

        const cookieUserType = Cookies.get('USER_TYPE');
        if (cookieUserType) {
            setUserType(cookieUserType);
        }
    }, []);

    const updateUser = (newUser: userStructure | null) => {
        setUser(newUser);
        if (newUser) {
            Cookies.set('USER', JSON.stringify(newUser), { expires: 7 }); // Cookie expires in 7 days
        } else {
            Cookies.remove('USER');
        }
    };

    const updateToken = (newToken: string | null) => {
        setToken(newToken);
        if (newToken) {
            Cookies.set('ACCESS_TOKEN', newToken, { expires: 7 }); // Cookie expires in 7 days
        } else {
            Cookies.remove('ACCESS_TOKEN');
        }
    };

    const updateUserType = (newUserType: string | null) => {
        setUserType(newUserType);
        if (newUserType) {
            Cookies.set('USER_TYPE', newUserType, { expires: 7 }); // Cookie expires in 7 days
        } else {
            Cookies.remove('USER_TYPE');
        }
    };

    return (
        <LoggedUserContext.Provider value={{
            user,
            token,
            userType,
            setUser: updateUser,
            setToken: updateToken,
            setUserType: updateUserType
        }}>
            {children}
        </LoggedUserContext.Provider>
    );
};

export const useLoggedUserContext = () => {
    const context = useContext(LoggedUserContext);

    if(!context) {
        throw new Error("useLoggedUserContext must be used within a LoggedUserProvider");
    }

    return context;
};