import { createBrowserRouter } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";
import UserTable from "../components/usertable";

const router = createBrowserRouter([
    {
        path: "/",
        element: <UserTable />,
    },
    {
        path: "/signup",
        element: <Signup />,
    },
    {
        path: "/login",
        element: <Login />,
    },
]);

export default router;