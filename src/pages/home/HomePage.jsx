import React, { useContext } from 'react';
import Hero from './Hero';
import LegalPracticeAreas from './LegalPracticeAreas';
import TopRatedAttorneys from './TopRatedAttorneys';
import Stats from './Stats';
import Reviews from './Reviews';
import { AuthContext } from '../../providers/AuthProvider';

const HomePage = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <div>
            <Hero />
            <LegalPracticeAreas />
            {
                currentUser.role!== "attorney" && <TopRatedAttorneys />
            }
            <Stats />
            <Reviews />
        </div>
    );
};

export default HomePage;