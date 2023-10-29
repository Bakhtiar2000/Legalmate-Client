import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const PostACase = () => {
    return (
        <div>
            <Helmet>
                <title>Post a Case - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Post a Case" />

            <h3>Post a Case</h3>
        </div>
    );
};

export default PostACase;