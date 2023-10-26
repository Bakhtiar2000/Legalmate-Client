import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useLoaderData } from 'react-router-dom';
import AttorneyDetailsBody from './AttorneyDetailsBody';

const AttorneyDetails = () => {
    const singleAttorney= useLoaderData()
    console.log(singleAttorney);

    return (
        <div>
             <Helmet>
                <title>Attorney Details - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Attorney Details" />

            <AttorneyDetailsBody singleAttorney={singleAttorney}></AttorneyDetailsBody>
        </div>
    );
};

export default AttorneyDetails;