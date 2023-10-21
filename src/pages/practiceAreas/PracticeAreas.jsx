import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const PracticeAreas = () => {
    return (
        <div>
             <Helmet>
                <title>Practice Areas - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="Practice Areas" />

            <h4>Practice areas</h4>
        </div>
    );
};

export default PracticeAreas;