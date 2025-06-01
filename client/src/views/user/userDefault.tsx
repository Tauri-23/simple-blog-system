import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useLoggedUserContext } from "../../context/LoggedUserContext";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";
import UserNavbar from "../../components/navigations/userNavbar";

export type userActivePageTypes = "Home" | "Drafts" | "Settings";

export interface outletContextTypes {
    setUserActivePage: (value: userActivePageTypes) => void
}

export default function UserDefault() {
    const { userType, token, setUserType, setUser, setToken } = useLoggedUserContext();
    const [userActivePage, setUserActivePage] = useState<userActivePageTypes>("Home");
    const location = useLocation();



    /**
     * Scroll up every change location
     */
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);





    /**
     * For protected access
     */
    useEffect(() => {
        if (token) {            
            axiosClient.get('/user')
            .then(({ data }) => {
                setUser(data.user);
            })
            .catch((error) => {
                console.error(error);
                if (error.response && error.response.status === 401) {
                    setUser(null);
                    setToken(null);
                    setUserType(null);
                }
            });
        } else {
            setUser(null); 
            setUserType(null);
        }
    }, []);

    // Handle redirection in the component body
    if (!token || userType !== 'user') {
        return <Navigate to="/" />;
    }



    /**
     * Render
     */
    return (
        <>
            <UserNavbar
            userActivePage={userActivePage}/>
            <Outlet context={{setUserActivePage}}/>
        </>
    )
}
