import { createBrowserRouter } from "react-router-dom";
import Root from "../LayOuts/Root";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Mybid from "../Pages/SellerPage/Mybid";
import BidRequest from "../Pages/SellerPage/BidRequest";
import AddJob from "../Pages/ClientPage/AddJob";
import MyPostedJob from "../Pages/ClientPage/MyPostedJob";

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
                    path:'/my_bid',
                    element:<Mybid></Mybid>
                },
                {
                    path:'/bid_request',
                    element:<BidRequest></BidRequest>
                },
                {
                    path:'/add_job',
                    element:<AddJob></AddJob>
                },
                {
                    path:'/my_posted_job',
                    element:<MyPostedJob></MyPostedJob>
                }
            ]
        }
    ]
);

export default router;