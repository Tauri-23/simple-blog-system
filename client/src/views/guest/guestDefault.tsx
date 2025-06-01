import { Navigate, Outlet, useLocation } from "react-router-dom";
import GuestNavbar from "../../components/navigations/guestNavbar";
import { useLoggedUserContext } from "../../context/LoggedUserContext";
import axiosClient from "../../axios-client";
import { useEffect } from "react";

export default function GuestDefault() {
    const {token, userType, setUser, setToken, setUserType} = useLoggedUserContext();

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
        if(token) {
            axiosClient.get('/user')
            .then(({data}) => {
                setUser(data.user);
                setUserType(data.userType);
            })
            .catch((error) => {
                console.error(error);
                setUserType(null);
                setUser(null);
                setToken(null);
            })
        }
    }, []);



    // Render based on userType
    if(token) {
        if(userType === "user") {
            return <Navigate to="/BlogSystemUser"/>
        } else if(userType === "admin") {
            return <Navigate to="/BlogSystemAdmin"/>
        }
    }



    /**
     * Render
     */
    return(
        <div className="w-100 h-100 position-relative">
            <GuestNavbar/>
            <Outlet/>
        </div>
    );
}