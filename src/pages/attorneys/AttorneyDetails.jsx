import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import { useLoaderData } from 'react-router-dom';

const AttorneyDetails = () => {
    // const singleAttorney= useLoaderData()
    return (
        <div>
             <Helmet>
                <title>Recruiter Details - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Recruiter Details" />

            <h3>Attorney id: {singleAttorney?._id}</h3>
        </div>
    );
};

export default AttorneyDetails;