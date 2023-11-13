import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Main from '../layout/Main';
import ErrorPage from '../pages/errorPage/errorPage';
import Login from '../pages/login/Login';
import HomePage from '../pages/home/HomePage';
import PracticeAreas from '../pages/practiceAreas/PracticeAreas';
import Attorneys from '../pages/attorneys/Attorneys';
import AboutUs from '../pages/aboutUs/AboutUs';
import Contact from '../pages/contact/Contact';
import Register from '../pages/login/Register';
import Messages from '../pages/messages/Messages';
import FindCases from '../pages/findCases/FindCases';
import MyCases from '../pages/myCases/MyCases';
import MyProfile from '../pages/myProfile/MyProfile';
import PaymentHistory from '../pages/paymentHistory/PaymentHistory';
import PrivateRoute from './PrivateRoute';
import AttorneyDetails from '../pages/attorneys/AttorneyDetails';
import PostACase from '../pages/postACase/PostACase';
import AllPayments from '../pages/allPayments/AllPayments';
import AllAttorneys from '../pages/allAttorneys/allAttorneys';
import AllClients from '../pages/allClients/AllClients';
import AllCases from '../pages/allCases/AllCases';
import ClientDetails from '../pages/allClients/ClientDetails';
import Awareness from '../pages/awareness/Awareness';
import WriteAReview from '../pages/writeAReview/WriteAReview';

const baseURL= "https://legalmate-server.vercel.app/"

const router= createBrowserRouter([
        {
            path: "/",
            element: <Main></Main>,
            errorElement: <ErrorPage></ErrorPage>,
            children: [
                {
                    path: "/",
                    element: <HomePage></HomePage>
                },
                {
                    path: "/practiceAreas",
                    element: <PracticeAreas></PracticeAreas>
                },
                {
                    path: "/attorneys",
                    element: <Attorneys></Attorneys>
                },
                {
                    path: "/attorney_details/:id",
                    element: <PrivateRoute><AttorneyDetails></AttorneyDetails></PrivateRoute>,
                    loader: ({ params }) => fetch(`${baseURL}attorney/${params.id}`)
                },
                {
                    path: "/client_details/:id",
                    element: <ClientDetails></ClientDetails>,
                    loader: ({ params }) => fetch(`${baseURL}client/id/${params.id}`)
                },
                {
                    path: "/aboutUs",
                    element: <AboutUs></AboutUs>
                },
                {
                    path: "/contact",
                    element: <Contact></Contact>
                },
                {
                    path: "/awareness",
                    element: <Awareness></Awareness>
                },
                {
                    path: "/WriteAReview",
                    element: <WriteAReview></WriteAReview>
                },
                {
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: "/register",
                    element: <Register></Register>
                },
                {
                    path: "/messages",
                    element: <Messages></Messages>
                },
                {
                    path: "/findCases",
                    element: <FindCases></FindCases>
                },
                {
                    path: "/postACase",
                    element: <PostACase></PostACase>
                },
                {
                    path: "/myCases",
                    element: <MyCases></MyCases>
                },
                {
                    path: "/myProfile",
                    element: <MyProfile></MyProfile>
                },
                {
                    path: "/paymentHistory",
                    element: <PaymentHistory></PaymentHistory>
                },
                {
                    path: "/allAttorneys",
                    element: <AllAttorneys></AllAttorneys>
                },
                {
                    path: "/allClients",
                    element: <AllClients></AllClients>
                },
                {
                    path: "/allCases",
                    element: <AllCases></AllCases>
                },
                {
                    path: "/allPayments",
                    element: <AllPayments></AllPayments>
                }
            ]
        }
    ])

export default router;