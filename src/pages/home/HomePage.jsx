import React from 'react';
import Hero from './Hero';
import LegalPracticeAreas from './LegalPracticeAreas';
import TopRatedAttorneys from './TopRatedAttorneys';
import Stats from './Stats';
import Reviews from './Reviews';

const HomePage = () => {
    return (
        <div>
            <Hero />
            <LegalPracticeAreas />
            <TopRatedAttorneys />
            <Stats />
            <Reviews />
        </div>
    );
};

export default HomePage;