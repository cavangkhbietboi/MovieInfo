import React from "react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "apiConfig/config";
import { SwiperSlide, Swiper } from "swiper/react";
import SwiperCore, { Autoplay } from "swiper";
import Button from "components/button/Button";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  SwiperCore.use([Autoplay]);
  const { data } = useSWR(tmdbAPI.getMovieList("upcoming"), fetcher);
  console.log(data);
  const movies = data?.results || [];
  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper
        modules={[Autoplay]}
        grabCursor="true"
        slidesPerView={"1"}
        autoplay={{ delay: 3000 }}
      >
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem props={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};
function BannerItem({ props }) {
  const { title, backdrop_path, id, genre_ids } = props;
  const navigate = useNavigate();
  const { data } = useSWR(tmdbAPI.getGenreMovie("list"), fetcher);
  const { genres } = data || [];
  console.log(genre_ids);
  console.log(genres);

  return (
    <div className="w-full h-full rounded-lg relative">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.5)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt="Backdrop"
        className="w-full h-full object-cover rounded-lg"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-3xl mb-5">{title}</h2>
        <div className="flex items-center mb-8">
          {genres?.map((item1) =>
            genre_ids?.map(
              (item2) =>
                item1.id === item2 && (
                  <button
                    className="py-2 px-4 border border-white hover:border-primary rounded-md ml-0 mr-1 cursor-pointer "
                    key={item1.id}
                    onClick={() => navigate(`/genre/${item1.id}`)}
                  >
                    <span>{item1.name}</span>
                  </button>
                )
            )
          )}
        </div>
        <Button onClick={() => navigate(`/movie/${id}`)}>Watch now</Button>
      </div>
    </div>
  );
}

export default Banner;
