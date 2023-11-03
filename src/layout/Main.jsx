import React, { useContext } from 'react';
import Header from '../shared/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer';
// react toastify
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../providers/AuthProvider';
import PageLoader from "../components/PageLoader"
const Main = () => {
    const {currentUser, loading} = useContext(AuthContext)
    return (
        <div>
            <Header></Header>
            <div className='bg-[#14161B] text-white pt-10'>
                {currentUser && loading ? <PageLoader />: <Outlet></Outlet>}
            </div>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Main;