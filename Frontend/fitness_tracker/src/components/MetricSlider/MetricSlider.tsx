"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import MetricCard from "@/components/MetricCard/MetricCard";
import { Metric } from "@/app/diary/page";

export default function MetricSlider({
  metrics,
  onClick,
}: {
  metrics: Metric[];
  onClick?: (m: Metric) => void;
}) {
  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{ clickable: true }}
      breakpoints={{
        640: { slidesPerView: 2, spaceBetween: 18 },
        768: { slidesPerView: 4, spaceBetween: 28 },
        1024: { slidesPerView: 5, spaceBetween: 40 },
      }}
      modules={[Pagination]}
      className="metricSwiper"
    >
      {metrics.map((m) => (
        <SwiperSlide key={m.id}>
          <MetricCard metric={m} onClick={onClick} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
