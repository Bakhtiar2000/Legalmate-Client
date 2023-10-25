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
import Appointments from '../pages/appointments/Appointments';
import Messages from '../pages/messages/Messages';
import FindCases from '../pages/findCases/FindCases';
import MyCases from '../pages/myCases/myCases';
import MyProfile from '../pages/myProfle/MyProfile';
import PaymentHistory from '../pages/paymentHistory/PaymentHistory';
import PrivateRoute from './PrivateRoute';
import AttorneyDetails from '../pages/attorneys/AttorneyDetails';

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
                    // loader: ({ params }) => fetch(`${baseURL}/attorney/${params.id}`)
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
                    path: "/login",
                    element: <Login></Login>
                },
                {
                    path: "/register",
                    element: <Register></Register>
                },
                {
                    path: "/appointments",
                    element: <Appointments></Appointments>
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
                }
            ]
        }
    ])

export default router;