import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import AttorneyProfile from './AttorneyProfile';
import useAuth from '../../hooks/useAuth';
import ClientProfile from './ClientProfile';

const MyProfile = () => {
    const {currentUser} = useAuth()
    console.log(currentUser);
    return (
        <div>
            <Helmet>
                <title>My Profile - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="My Profile" />

           {
                currentUser.role=== "attorney"?
                <AttorneyProfile></AttorneyProfile>:
                <ClientProfile></ClientProfile>
           }
        </div>
    );
};

export default MyProfile;