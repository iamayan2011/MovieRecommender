import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperInstance } from "swiper";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";



// @ts-expect-error: missing declarations for swiper css
import "swiper/css";
// @ts-expect-error: missing declarations for swiper css
import "swiper/css/free-mode";
// @ts-expect-error: missing declarations for swiper css
import "swiper/css/navigation";
// @ts-expect-error: missing declarations for swiper css
import "swiper/css/thumbs";

export default function Carousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperInstance | null>(null);

  const movies = [
    {
      title: "Extraction 2",
      description:
        "A black ops mercenary’s mission goes awry when he’s caught in a dangerous web.",
      image: "https://images.alphacoders.com/131/thumb-1920-1319722.jpeg",
      link: "https://www.netflix.com/title/81098494",
    },
    {
      title: "Interstellar",
      description:
        "A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.",
      image:
        "https://image.tmdb.org/t/p/original/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg",
      link: "https://www.primevideo.com/detail/0H3EQ2GZ5PXZBLSLAL8E6X55EF",
    },
    {
      title: "Dune: Part Two",
      description:
        "Paul Atreides unites with the Fremen to seek revenge against those who destroyed his family.",
      image:
        "https://image.tmdb.org/t/p/original/8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg",
      link: "https://www.hbomax.com/feature/urn:hbo:feature:GYR2Nkg5z_UKDWQEAAABt",
    },
    {
      title: "John Wick 4",
      description:
        "John Wick uncovers a path to defeating The High Table, but must face a new enemy.",
      image:
        "https://image.tmdb.org/t/p/original/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg",
      link: "https://www.lionsgate.com/movies/john-wick-chapter-4",
    },
  ];

  return (
    <div className="relative h-screen w-full bg-black text-white overflow-hidden">
      {/* Top Carousel */}
      <Swiper
        style={{
          //@ts-expect-error: ignore
          "--swiper-navigation-color": "#fff",
        }}
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="w-full h-full z-0"
      >
        <SwiperSlide>
          <div className="relative w-full h-full">
            
            <img
              src="/moviemain2.jpg"
              alt="Movie Collage"
              className="w-full h-full object-cover"
            />

            
            <div className="absolute top-0 left-0 h-full w-[60%] bg-gradient-to-r from-black from-5% to-transparent z-10" />

            
            <div className="absolute top-1/3 left-10 z-20 max-w-xl space-y-4 text-left mx-10">
              <h2 className="text-4xl font-bold">Movie Recommender System</h2>
              <p className="text-sm text-gray-300">A movie recommender system which suggests you movies based on your selection.</p>
              <a href ="#recommender" 
                className="inline-block px-5 py-2 bg-white hover:bg-gray-400 !text-black rounded-md text-sm"
              >
                Try Now
              </a>
            </div>
          </div>
        </SwiperSlide>

        {movies.map((movie, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-full">
             
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-full object-cover"
              />

              
              <div className="absolute top-0 left-0 h-full w-[60%] bg-gradient-to-r from-black from-5% to-transparent z-10" />

              
              <div className="absolute top-1/3 left-10 z-20 max-w-xl space-y-4 text-center md:text-left md:mx-10">
                <h2 className="text-4xl font-bold">{movie.title}</h2>
                <p className="text-sm text-gray-300">{movie.description}</p>
                <a
                  href={movie.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block px-5 py-2 bg-white hover:bg-gray-400 !text-black rounded-md text-sm"
                >
                  Watch Now
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Thumbnail Controller */}
      <div className="absolute z-20 bottom-4 left-1/2 -translate-x-1/2 w-[90%] px-2">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={10}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="myThumbSwiper"
        >
             <SwiperSlide className="!w-40 !h-24">
              <img
                src="/moviemain2.jpg"
                alt=""
                className="rounded-md object-cover w-full h-full border-4 border-transparent opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </SwiperSlide>
          {movies.map((movie, idx) => (
            <SwiperSlide key={idx} className="!w-40 !h-24">
              <img
                src={movie.image}
                alt={movie.title}
                className="rounded-md object-cover w-full h-full border-4 border-transparent opacity-70 hover:opacity-100 transition-all duration-300"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

     
      <style>{`
        .myThumbSwiper .swiper-slide-thumb-active img {
          border-color: #CBACF9; /* red-400 */
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
