import { Button } from "antd";
import { useGeneralContext } from "../../context/GeneralContext";

export default function GuestNavbar() {
    const { showModal } = useGeneralContext();



    /**
     * Handlers
     */
    const handleLoginClick = () => {
        showModal("LoginSignupModal");
    }



    /**
     * Render
     */
    return(
        <nav className="nav1">
            <div className="text-l1">Tauri's Blogs</div>

            <Button
            type="primary"
            onClick={handleLoginClick}>
                Login
            </Button>
        </nav>
    )
}