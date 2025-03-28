import { createBrowserRouter } from "react-router-dom";
import Root from "../LayOuts/Root";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";

const router=createBrowserRouter(
    [
        {
            path: "/",
            element:<Root></Root>,
            children:[
                {
                    path:'/',
                    element:<Home></Home>
                },
                {
                    path: '/login',
                    element:<Login></Login>
                },
                {
                    path:'/register',
                    element:<Registration></Registration>
                },
                {

                }
            ]
        }
    ]
);

export default router;