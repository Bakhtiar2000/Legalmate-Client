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

            <h3>About Us</h3>
        </div>
    );
};

export default AboutUs;