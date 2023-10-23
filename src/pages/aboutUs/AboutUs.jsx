import React from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumbs from '../../components/Breadcrumbs';

const AboutUs = () => {
    return (
        <div>
             <Helmet>
                <title>About Us - Legalmate</title>
            </Helmet>

            <Breadcrumbs title="About Us" />

            <h3>About Us</h3>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum error quae tempora porro eos culpa exercitationem, omnis voluptatum impedit ducimus, officia rem numquam at molestias consectetur reiciendis. Hic porro accusamus nisi dignissimos repudiandae voluptatem recusandae incidunt fuga placeat, odit reprehenderit impedit nobis consequatur dicta in, provident eveniet. Voluptatum, culpa fugiat.
        </div>
    );
};

export default AboutUs;