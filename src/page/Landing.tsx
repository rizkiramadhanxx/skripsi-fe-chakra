import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Howtouse from "@/components/landing/Howtouse";
import Navbar from "@/components/landing/Navbar";
import Purpose from "@/components/landing/Purpose";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Purpose />
      <Howtouse />
      <Footer />
    </div>
  );
};

export default Landing;
