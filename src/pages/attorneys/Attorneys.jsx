import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const Attorneys = () => {
    return (
        <div>
             <Helmet>
                <title>Our Attorneys - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Our Attorneys" />

            <h3>Attorneys</h3>
        </div>
    );
};

export default Attorneys;