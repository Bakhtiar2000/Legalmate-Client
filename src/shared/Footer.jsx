import React from 'react';
import logo from "/Legalmate Icon.ico"

const Footer = () => {
    return (
        <footer className="footer p-10 bg-dark text-white z-50">
          <aside className='md:mx-auto'>
            <img src={logo} alt="" />
            <p className='text-center text-primary text-2xl -mt-3'>Legalmate</p>
            <p>Serving Legal support since 2012</p>
          </aside> 
          <nav className='md:mx-auto'>
            <header className="footer-title">Services</header> 
            <a className="link link-hover">Branding</a> 
            <a className="link link-hover">Design</a> 
            <a className="link link-hover">Marketing</a> 
            <a className="link link-hover">Advertisement</a>
          </nav> 
          <nav className='md:mx-auto'>
            <header className="footer-title">Company</header> 
            <a className="link link-hover">About us</a> 
            <a className="link link-hover">Contact</a> 
            <a className="link link-hover">Jobs</a> 
            <a className="link link-hover">Press kit</a>
          </nav> 
          <nav className='md:mx-auto'>
            <header className="footer-title">Contact Us</header> 
            <p>43/7 Northern Tower, Banani</p>
            <p>Dhaka-1263, Bangladesh</p>
            <p>support@legalmate.com</p>
            <p>+8801543435473</p>
          </nav>
        </footer>
    );
};

export default Footer;