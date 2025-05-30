import { createBrowserRouter } from "react-router-dom";
import GuestDefault from "./views/guest/guestDefault";
import GuestIndex from "./views/guest/guestIndex";

const router = createBrowserRouter([
    /**
     * Guest
     */
    {
        path: "/",
        element: <GuestDefault/>,
        children: [
            {
                index: true,
                element: <GuestIndex/>
            }
        ]
    },
]);

export default router;