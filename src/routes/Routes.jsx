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
                }
            ]
        }
    ])

export default router;