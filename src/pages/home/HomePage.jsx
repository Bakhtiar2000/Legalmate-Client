import React from 'react';
import Hero from './Hero';
import LegalPracticeAreas from './LegalPracticeAreas';
import TopRatedAttorneys from './TopRatedAttorneys';
import Stats from './Stats';
import Reviews from './Reviews';
import Partners from './Partners';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <div className='container'>
                <LegalPracticeAreas />
                <TopRatedAttorneys />
                <Stats />
                <Reviews />
                <Partners />
            </div>
        </div>
    );
};

export default HomePage;