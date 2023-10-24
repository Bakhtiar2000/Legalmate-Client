import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const FindCases = () => {
    return (
        <div>
            <Helmet>
                <title>Find Cases - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Find Cases" />

            <h3>Find Cases</h3>
        </div>
    );
};

export default FindCases;