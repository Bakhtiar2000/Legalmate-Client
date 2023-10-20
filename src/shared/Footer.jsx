import React from 'react';
import logo from "/Legalmate Icon.ico"

const Footer = () => {
    return (
        <footer className="footer p-10 bg-dark text-white">
          <aside>
            <img src={logo} alt="" />
            <p className='text-center text-primary text-2xl -mt-3'>Legalmate</p>
            <p>Serving Legal support since 2012</p>
          </aside> 
          <nav>
            <header className="footer-title">Services</header> 
            <a className="link link-hover">Branding</a> 
            <a className="link link-hover">Design</a> 
            <a className="link link-hover">Marketing</a> 
            <a className="link link-hover">Advertisement</a>
          </nav> 
          <nav>
            <header className="footer-title">Company</header> 
            <a className="link link-hover">About us</a> 
            <a className="link link-hover">Contact</a> 
            <a className="link link-hover">Jobs</a> 
            <a className="link link-hover">Press kit</a>
          </nav> 
          <nav>
            <header className="footer-title">Legal</header> 
            <a className="link link-hover">Terms of use</a> 
            <a className="link link-hover">Privacy policy</a> 
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
    );
};

export default Footer;