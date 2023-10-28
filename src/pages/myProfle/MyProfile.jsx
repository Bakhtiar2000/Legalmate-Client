import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import AttorneyProfile from './AttorneyProfile';

const MyProfile = () => {
    return (
        <div>
            <Helmet>
                <title>My Profile - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="My Profile" />

            <AttorneyProfile></AttorneyProfile>
        </div>
    );
};

export default MyProfile;