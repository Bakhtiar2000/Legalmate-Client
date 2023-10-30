import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import useAuth from '../../hooks/useAuth';
import useIndividualPaymentHistory from '../../hooks/useIndividualPaymentHistory';
import PageLoader from '../../components/PageLoader';

const PaymentHistory = () => {
    const { currentUser, loading } = useAuth();
    if (loading) {
        <PageLoader />
    }
    const [paymentsData, paymentsLoading, paymentsRefetch] = useIndividualPaymentHistory();


    console.log(paymentsData)

    // useEffect(() => {
    //     paymentData?.map(pay => {
    //         const paymentStatus = pay.attorneyID === _id && pay.attorneyEmail === email && pay.clintEmail === currentUser?.email && pay.clintName === currentUser.name

    //         if (paymentStatus) setPaymentSuccess(true)

    //         // console.log("paymentStatus", paymentStatus)

    //     })

    // }, [])
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