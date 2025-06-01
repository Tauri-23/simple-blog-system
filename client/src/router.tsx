import { createBrowserRouter } from "react-router-dom";
import GuestDefault from "./views/guest/guestDefault";
import GuestIndex from "./views/guest/guestIndex";
import UserDefault from "./views/user/userDefault";
import UserIndex from "./views/user/userIndex";
import UserDraftsIndex from "./views/user/drafts/userDraftsIndex";

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





    /**
     * User
     */
    {
        path: "/BlogSystemUser",
        element: <UserDefault/>,
        children: [
            {
                index: true,
                element: <UserIndex/>
            },
            {
                path: "Drafts",
                element: <UserDraftsIndex/>
            }
        ]
    }
]);

export default router;