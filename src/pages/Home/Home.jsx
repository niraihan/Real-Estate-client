import React from 'react';
import Banner from '../../components/Banner';
import AdvertisementSection from '../AdvertisementSection';
import LatestReviewSection from '../LatestReviewSection';
import FeaturedCities from '../FeaturedCities';
import WhyChooseUs from '../WhyChooseUs';
import useTitle from '../../hooks/useTitle';

const Home = () => {
    useTitle("Home")
    return (
        <div>
            <Banner />
            <AdvertisementSection />
            <LatestReviewSection />
            <FeaturedCities />
            <WhyChooseUs />
        </div>
    );
};

export default Home;