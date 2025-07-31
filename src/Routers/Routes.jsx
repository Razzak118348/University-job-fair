import { createBrowserRouter } from "react-router-dom";
import Root from "../LayOuts/Root";
import Login from "../Pages/Login/Login";
import Home from "../Pages/Home/Home";
import Registration from "../Pages/Registration/Registration";
import Mybid from "../Pages/SellerPage/Mybid";
import BidRequest from "../Pages/SellerPage/BidRequest";
import AddJob from "../Pages/ClientPage/AddJob";
import MyPostedJob from "../Pages/ClientPage/MyPostedJob";
import Profile from "../Pages/ProfilePage/Profile";
import PrivateRoute from "./PrivateRoute";
import AllJob from "../Pages/AllJob/AllJob";

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
                    element:<PrivateRoute><Mybid></Mybid></PrivateRoute>
                },
                {
                    path:'/bid_request',
                    element:<PrivateRoute><BidRequest></BidRequest></PrivateRoute>
                },
                {
                    path:'/add_job',
                    element:<PrivateRoute><AddJob></AddJob></PrivateRoute>
                },
                {
                    path:'/my_posted_job',
                    element:<PrivateRoute><MyPostedJob></MyPostedJob></PrivateRoute>
                },
                {
                    path:'/profile',
                    element:<PrivateRoute><Profile></Profile></PrivateRoute>
                },
                {
                    path:'/allJob',
                    element: <AllJob></AllJob>
                }
            ]
        }
    ]
);

export default router;