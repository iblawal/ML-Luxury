"use client";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedProducts from "./FeaturedProducts";
import { i } from "framer-motion/client";
import { useState } from "react";
import StyledForYou from "./StyledForYou";
import AboutIntro from "./components/AboutUs";
import WhyChooseUs from "./components/WhyChooseUs";
import Tesmonial from "./components/Testimonial";
import Chatbot from "./components/Chatbot";
import Footer from "./components/Footer";
import ShopNow from "./components/ShopNow";



export default function Home() {
  return (
    <div className="w-full h-full">
      <Navbar />
      <Hero />
      <Categories />
      <ShopNow/>
      <FeaturedProducts />
      <StyledForYou />
      <AboutIntro />
      <WhyChooseUs />
      <Tesmonial />
      <Chatbot />
      <Footer/>
    </div>
  );
}
