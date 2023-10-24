import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const MyProfile = () => {
    return (
        <div>
            <Helmet>
                <title>My Profile - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="My Profile" />

            <h3>My Profile</h3>
        </div>
    );
};

export default MyProfile;