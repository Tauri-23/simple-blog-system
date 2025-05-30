import { Outlet } from "react-router-dom";
import GuestNavbar from "../../components/navigations/guestNavbar";

export default function GuestDefault() {
    return(
        <div className="w-100 h-100 position-relative">
            <GuestNavbar/>
            <Outlet/>
        </div>
    );
}