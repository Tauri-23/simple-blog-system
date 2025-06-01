import { Button } from "antd";
import axiosClient from "../../axios-client";
import { useState } from "react";
import { useLoggedUserContext } from "../../context/LoggedUserContext";
import { Link } from "react-router-dom";
import { userActivePageTypes } from "../../views/user/userDefault";

interface userNavTypes {
    userActivePage: userActivePageTypes
}

const UserNavbar:React.FC<userNavTypes> = ({
    userActivePage
}) => {
    const { setUserType, setUser, setToken } = useLoggedUserContext();
    const [ isLoggingOut, setIsLoggingOut ] = useState<boolean>(false);

    const links = [
        {
            title: "Home",
            to: "",
            activeAt: "Home"
        },
        {
            title: "Drafts",
            to: "Drafts",
            activeAt: "Drafts"
        }
    ];



    /**
     * Handlers
     */
    const handleLoginClick = () => {
        setIsLoggingOut(true);
        axiosClient.post('/logout')
        .then(() => {
            setUser(null);
            setToken(null);
            setUserType(null);
        })
        .finally(() => {
            setIsLoggingOut(false);
        });
    }



    /**
     * Render
     */
    return(
        <nav className="nav1">
            <div className="text-l1">Tauri's Blogs</div>

            <div className="nav1-links">
                {links.map((link, index) => (
                    <Link key={index} to={link.to} className={`nav1-link ${link.activeAt === String(userActivePage) ? "active" : ""}`}>{link.title}</Link>
                ))}
                
            </div>

            <Button
            variant="solid"
            color="red"
            loading={isLoggingOut}
            onClick={handleLoginClick}>
                Logout
            </Button>
        </nav>
    )
}

export default UserNavbar;