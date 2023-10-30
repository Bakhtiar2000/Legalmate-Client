import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const AllPayments = () => {
    return (
        <div>
            <Helmet>
                <title>All Payments - Legalmate</title>
            </Helmet>
            <Breadcrumbs title="All Payments" />
            <h3>All Payments</h3>
        </div>
    );
};

export default AllPayments;