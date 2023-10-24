import React, { useContext, useState } from 'react';
import logo from "/Legalmate Icon.ico"
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import NavItems from '../components/navItems';

const Header = () => {
    const { user, logOut } = useContext(AuthContext)
    const [isMenuOpen, setIsMenuOpen]= useState(false)
    const handleLogOut = () => {
        logOut()
            .then()
            .catch()
    }
    console.log(isMenuOpen);
    
    return (
        <div className="flex justify-between gap-5 items-center px-5 py-3 bg-dark z-50">

            {/* Logo nad name */}
           <div className='flex gap-5'>
                <div className='flex justify-center items-center gap-3'>
                    <img className='w-20 md:w-fit' src={logo} alt="" />   
                    <p className='text-xl md:text-3xl font-semibold text-primary'>Legalmate</p>
                </div>
           </div>

           {/* NavItems in the center */}
            <ul className='hidden lg:flex justify-center gap-5 items-center text-white'>
                <NavItems />
            </ul>

            {/* Login button */}
            {
                user?.email?
                <div className='hidden lg:flex justify-end items-center gap-10'>
                    <Link className='w-6 h-6 md:w-10 md:h-10' to='/'><img src={user?.photoURL} alt={user?.displayName} className='rounded-full w-6 h-6 md:w-10 md:h-10' /></Link>
                    <button className='px-5 py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white' onClick={handleLogOut}>Log out</button>
                </div> :
                <Link to="/login">
                    <button className='hidden lg:block px-5 py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white'>Login</button>
                </Link>

            }

            {/* SideNav */}
           <div className='lg:hidden flex justify-end items-center gap-10'>
            <Link className='w-6 h-6 md:w-10 md:h-10' to='/'><img src={user?.photoURL} alt={user?.displayName} className='rounded-full w-6 h-6 md:w-10 md:h-10' /></Link>
                <label className="btn btn-circle swap swap-rotate bg-transparent text-white hover:text-black">
                    <input  onClick={() => setIsMenuOpen(isMenuOpen => !isMenuOpen)} type="checkbox" />  

                    {/* hamburger icon */}
                    <svg className="swap-off fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z"/></svg>

                    {/* close icon */}
                    <svg className="swap-on fill-current" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"><polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49"/></svg>
                </label>
           </div>

                {
                    isMenuOpen &&
                    // NavItems
                    <ul className="absolute lg:hidden top-24 right-2 duration-300 bg-dark z-50 p-2 menu text-white w-56 rounded-box">
                        <NavItems />

                    {/* Login button */}
                    {
                        user?.email?
                        <button className='mt-3 text-center px-5 py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white' onClick={handleLogOut}>Log out</button>:
                        <Link to="/login" className='mt-3 text-center px-5 py-3 bg-secondary hover:bg-secondary/60 duration-300 rounded-lg text-white'>Login</Link>
                    }
                    </ul>
                }
        </div>
    );
};

export default Header;