import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import useAuth from '../../hooks/useAuth';
import useIndividualPaymentHistory from '../../hooks/useIndividualPaymentHistory';
import PageLoader from '../../components/PageLoader';
import PaymentHistoryTableRow from './PaymentHistoryTableRow';

const PaymentHistory = () => {
    const [paymentsData, paymentsLoading, paymentsRefetch] = useIndividualPaymentHistory();
    if(paymentsLoading) return <PageLoader />

    
    return (
        <div>
            <Helmet>
                <title>Payment History - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Payment History" />

            <div className='container py-20'>
                <div className="w-full mx-auto overflow-x-auto duration-300 rounded-md shadow-4xl shadow-gray/40 bg-lightDark">
                    {
                        paymentsData.length > 0 ?

                        <table className="table lg:w-full text-white">
                            <thead className="text-lg text-green border-b border-green/40">
                                <tr>
                                    <th className="px-3 py-3 font-medium text-center text-white">SL</th>
                                    <th className="px-3 py-3 font-medium text-center text-white">Sender</th>
                                    <th className="px-3 py-3 font-medium text-center text-white">Sender Mail</th>
                                    <th className="px-3 py-3 font-medium text-center text-white">Target</th>
                                    <th className="px-3 py-3 font-medium text-center text-white">Target Mail</th>
                                    <th className="px-3 py-3 font-medium text-center text-white">Tran_ID</th>
                                    <th className="px-3 py-3 font-medium text-center text-white">Paid?</th>
                                    <th className="px-3 py-3 font-medium text-center text-white">Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    paymentsData.map((payment, index) => (
                                        <PaymentHistoryTableRow
                                            index={index}
                                            key={payment._id}
                                            payment={payment}
                                            refetch={paymentsRefetch}
                                        />
                                    )) 
                                }
                            </tbody>
                        </table>:
                        <p className="py-4 text-lg text-center">☹ No data available!</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default PaymentHistory;