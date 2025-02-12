import React from "react";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";
import FeatureProducts from "./components/FeatureProducts";

const Home = () => {
// Here we are passing data to our HeroSection component using props
  const data = {
    name: "Gearlogy",
    description: "Welcome to Gearlogy, your top destination for cutting-edge electronics. Discover the latest gadgets, from smartphones to smart home solutions, all blending technology with style. Experience high-quality products, user-friendly interface, and dedicated support. Elevate your electronics lifestyle with Gearlogy."
  }
  return( 
        <>
          <HeroSection myData={data}/>  {/*This is our hero section component for Home page*/}
          <FeatureProducts/>            {/*This is our feature products component for Home page*/}  
          <Services />                  {/*This is our services component for Home page*/}
          <Trusted />                   {/*This is our trusted component for Home page*/} 
        </>
  );
};

export default Home;