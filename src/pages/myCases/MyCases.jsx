import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const MyCases = () => {
    return (
        <div>
            <Helmet>
                <title>My Cases - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="My Cases" />

            <h3>My Cases</h3>
        </div>
    );
};

export default MyCases;