import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const Contact = () => {
    return (
        <div>
             <Helmet>
                <title>Contact - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Contact" />


            <h3>Contact</h3>
        </div>
    );
};

export default Contact;