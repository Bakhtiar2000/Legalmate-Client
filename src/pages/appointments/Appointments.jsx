import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const Appointments = () => {
    return (
        <div>
            <Helmet>
                <title>Appointments - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Appointments" />

            <h3>Appointments</h3>
        </div>
    );
};

export default Appointments;