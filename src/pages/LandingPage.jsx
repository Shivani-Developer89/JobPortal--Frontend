import Navbar from "../components/navbar/Navbar";
import Hero from "../components/home/Hero";

import FeaturedJobs from "../components/home/FeaturedJobs";
import Footer from "../components/home/Footer";

const LandingPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      
      <FeaturedJobs />
      <Footer />
    </>
  );
};

export default LandingPage;