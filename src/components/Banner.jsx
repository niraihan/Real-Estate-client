import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  const bannerImages = [
    {
      url: "https://i.ibb.co/jP8Gjj6x/Adobe-Express-file.jpg",
      caption: "Find Your Dream Property Today!",
    },
    {
      url: "/banner2.jpg",
      caption: "Modern Homes for Modern Living",
    },
    {
      url: "/banner3.jpg",
      caption: "Trusted Agents. Verified Listings.",
    },
  ];

  return (
    <div className="h-[30vh] sm:h-[60vh] md:h-[80vh] w-full rounded-xl overflow-hidden shadow-xl bg-base-200">
      <Swiper
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        loop
        modules={[Navigation, Pagination, Autoplay]}
        className="h-full"
      >
        {bannerImages.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              <img
                src={slide.url}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />

              {/* Optional Caption Overlay */}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-white text-center px-4">
                  {slide.caption}
                </h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
