import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const AboutUs = () => {
    return (
        <div>
             <Helmet>
                <title>About Us - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="About Us" />

            <div className='container md:flex justify-center gap-10 py-20'>
                <img className='mx-auto h-fit' src="https://img.freepik.com/free-photo/businessman-pointing-screen-showing-project-details-colleague_74855-7976.jpg?size=626&ext=jpg&ga=GA1.1.670690934.1670350375&semt=ais" alt="" />

                <div>
                    <h2 className='text-4xl text-primary font-semibold mb-3 mt-10 md:mt-0 mx-auto'>Welcome to Legalmate</h2>
                    <p className='lg:text-xl'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae distinctio ea adipisci pariatur, ipsum repudiandae. Dolorem, ad? Incidunt, saepe necessitatibus sapiente eligendi maxime reprehenderit quisquam! Error necessitatibus blanditiis facere deserunt, dignissimos vitae eligendi animi totam nihil nemo eveniet tenetur voluptates est, quis consequuntur incidunt alias tempore repudiandae dicta eum cum aliquid ipsa iste ut? Qui quis error, fugiat corrupti, excepturi odit possimus eum voluptates distinctio iusto ex? Tenetur fugiat eum modi quas necessitatibus saepe sunt qui exercitationem magnam excepturi. Quaerat a amet molestias veniam exercitationem facilis possimus expedita fugit unde iste neque, iure id itaque totam alias blanditiis ab aut.</p>

                    <h2 className='text-4xl text-primary font-semibold mb-5 mt-10 mx-auto'>Why Choose Us?</h2>
                    <div className='flex items-center gap-3 mb-5 lg:text-xl'>
                        <img className="w-8 lg:w-10 h-8 lg:h-10" src="https://i.ibb.co/ChcsTY9/law-office-svgrepo-com.png" alt="" />
                        <p className='text-4xl pr-3'>:</p>
                        <p>Best Case Strategy</p>
                    </div>
                    <div className='flex items-center gap-3 mb-5 lg:text-xl'>
                        <img className="w-8 lg:w-10 h-8 lg:h-10" src="https://i.ibb.co/s6bDWsy/female-attorney-woman-female-lawyer-svgrepo-com.png" alt="" />
                        <p className='text-4xl pr-3'>:</p>
                        <p>Unparalleled Access to Top Attorneys</p>
                    </div>
                    <div className='flex items-center gap-3 mb-5 lg:text-xl'>
                        <img className="w-8 lg:w-10 h-8 lg:h-10" src="https://i.ibb.co/L858fbY/incognito-svgrepo-com.png" alt="" />
                        <p className='text-4xl pr-3'>:</p>
                        <p>Privacy and Security</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AboutUs;