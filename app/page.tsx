"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./FeaturedProducts";
import StyledForYou from "./StyledForYou";
import AboutIntro from "./components/AboutUs";
import WhyChooseUs from "./components/WhyChooseUs";
import Tesmonial from "./components/Testimonial";
import ContactUs from "./components/ContactUs";
import CookieConsent from "./components/CookieConsent";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import ShopNow from "./components/ShopNow";

export default function Home() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <section id="home">
        <Hero />
      </section>
      <section id="categories">
        <Categories />
      </section>
      <section id="shop">
        <ShopNow/>
      </section>
      <FeaturedProducts />
      <StyledForYou />
      <section id="about">
        <AboutIntro />
        <WhyChooseUs />
      </section>
      <section id="testimonials">
        <Tesmonial />
      </section>
      <section id="contact">
        <ContactUs />
        <Chatbot />
        <CookieConsent />
      </section>
      <Footer/>
    </div>
  );
}