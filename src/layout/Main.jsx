import React from 'react';
import Header from '../shared/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../shared/Footer';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <div className='bg-black text-white'>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;