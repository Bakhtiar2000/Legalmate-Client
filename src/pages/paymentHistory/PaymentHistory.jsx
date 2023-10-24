import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const PaymentHistory = () => {
    return (
        <div>
            <Helmet>
                <title>Payment History - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Payment History" />

            <h3>Payment History</h3>
        </div>
    );
};

export default PaymentHistory;