import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import slideOne from '../images/slide-1.jpg';
import slideTwo from '../images/slide-2.jpg';
import slideThree from '../images/slide-3.jpg';

function Banner() {
  return (
    <div className="relative">
      <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20"></div>
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        <div>
          <img loading="lazy" src={slideOne.src} alt="slide1" />
        </div>
        <div>
          <img loading="lazy" src={slideTwo.src} alt="slide2" />
        </div>
        <div>
          <img loading="lazy" src={slideThree.src} alt="slide3" />
        </div>
      </Carousel>
    </div>
  );
}

export default Banner;
