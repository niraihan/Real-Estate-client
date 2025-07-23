import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Banner = () => {
  return (
    <div className="h-[70vh]">
      <Swiper navigation={true} pagination={true} modules={[Navigation, Pagination]} className="h-full rounded-lg">
        <SwiperSlide>
          <img src="https://i.ibb.co/s9fVWNZc/chirag-saini-b-P-u-XDgj-A4-M-unsplash.jpg" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/HDBwWfDX/serzill-hasan-k4-Gx-CWVO6eo-unsplash.jpg" className="w-full h-full object-cover" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co/LDC8B4pF/rohan-gangopadhyay-he-Ia-Yq6-A7tg-unsplash.jpg" className="w-full h-full object-cover" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;