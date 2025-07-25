
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  const bannerImages = [
    "https://i.ibb.co/jP8Gjj6x/Adobe-Express-file.jpg",
    "/banner2.jpg",
    "/banner3.jpg",
  ];

  return (
    <div className="h-[70vh] md:h-[80vh] w-full rounded-lg overflow-hidden">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="h-full"
      >
        {bannerImages.map((img, index) => (
          <SwiperSlide key={index}>
            <div className="w-full h-full">
              <img
                src={img}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
