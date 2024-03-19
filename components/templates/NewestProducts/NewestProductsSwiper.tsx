"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import ProductCard from "@/components/modules/ProductCard";

import { Autoplay } from "swiper/modules";

export default function NewestProductsSwiper() {
  return (
    <Swiper
      slidesPerView={1}
      // centeredSlides={true}
      loop={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true,
      }}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
      spaceBetween={20}
      pagination={{
        type: "fraction",
      }}
      modules={[Autoplay]}
      // navigation={true}
      className="mySwiper">
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
      <SwiperSlide>
        <ProductCard />
      </SwiperSlide>
    </Swiper>
  );
}
