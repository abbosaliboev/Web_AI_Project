import React from 'react';
import About from '../About/About';
import Banner from '../Banner/Banner';
import Contact from '../Contact/Contact';
import Pricing from '../Pricing/Pricing';
import Services from '../Services/Services';

 

const Home = () => {
    return (
       <>
      
       <Banner></Banner>
       <About></About>
       <Services></Services>
       <Pricing></Pricing>
       <Contact></Contact>

       </>
    );
};

export default Home;