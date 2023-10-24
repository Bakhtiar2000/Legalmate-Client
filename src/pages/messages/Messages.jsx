import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const Messages = () => {
    return (
        <div>
            <Helmet>
                <title>Messages - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Messages" />

            <h3>Messages</h3>
        </div>
    );
};

export default Messages;