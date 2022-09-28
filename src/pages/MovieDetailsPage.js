import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import MovieCard from "components/movie/MovieCard";
import { fetcher, tmdbAPI } from "apiConfig/config";
import { useNavigate } from "react-router-dom";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();

  const { data } = useSWR(tmdbAPI.getMovieDetails(movieId), fetcher);
  console.log(data);
  if (!data) return null;
  const { backdrop_path, title, genres, overview, release_date, vote_average } =
    data;

  return (
    <div className="">
      <div className="w-full h-[500px] relative ">
        <div className="absolute inset-0 rounded-lg"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat rounded-lg object-fill"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="flex items-center justify-center text-4xl font-bold text-white my-10 gap-5">
        <span>{title}</span>
      </div>

      <div className="flex items-center justify-center gap-3 text-base mb-5">
        Released date:
        <span className="text-white text-sm font-medium border-2 rounded-sm px-2 py-0.5">
          {new Date(release_date).getFullYear()}
        </span>
      </div>

      <div className="flex items-center justify-center gap-3 text-base mb-5">
        Vote average
        <span>
          <svg
            height="24"
            version="1.1"
            width="24"
            xmlns="http://www.w3.org/2000/svg"
            xmlnscc="http://creativecommons.org/ns#"
            xmlnsdc="http://purl.org/dc/elements/1.1/"
            xmlnsrdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
          >
            <g transform="translate(0 -1028.4)">
              <path
                d="m9.5999 1.4564 1.5501 4.7699 5.015 0.0002-4.057 2.9482 1.55 4.7703-4.0581-2.948-4.0577 2.948 1.5497-4.7703-4.0575-2.9482 5.0154-0.0002z"
                fill="#FFE100"
                stroke="#FFE100"
                strokeWidth=".69755"
                transform="matrix(1.4336 0 0 1.4336 -1.7602 1028.9)"
              />
            </g>
          </svg>
        </span>
        :
        <span className="text-white text-sm font-medium rounded-sm px-2 py-0.5">
          {vote_average}
        </span>
      </div>
      {genres.length > 0 && (
        <div className="flex items-center justify-center gap-x-5 mb-10">
          {genres.map((item) => (
            <button
              className="py-2 px-4 border-primary hover:border-white hover:text-white text-primary border rounded ml-0 mr-1 cursor-pointer"
              key={item.id}
              onClick={() => navigate(`/genre/${item.id}`)}
            >
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      )}
      <p className="text-center leading-relaxed max-w-[600px] mx-auto mb-10">
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta type="videos"></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, type), fetcher);
  console.log(data);

  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length <= 0) return null;

    return (
      <div className="py-10">
        <h2 className="text-center text-3xl mb-10">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div className="cast-item" key={item.id}>
              <img
                src={tmdbAPI.imageOriginal(item.profile_path)}
                className="w-full h-[350px] object-cover rounded-lg mb-3"
                alt=""
              />
              <h3 className="text-xl font-medium">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length <= 0) return null;
    if (type === "videos")
      return (
        <div className="py-10 ">
          <div className="flex flex-col gap-10 items-center justify-center">
            {results.slice(0, 1).map((item) => (
              <div className="" key={item.id}>
                <h3 className="mb-5 text-xl font-medium px-5 py-2 bg-secondary inline-block rounded-xs">
                  Trailer
                </h3>
                <div key={item.id} className="w-800 h-600 ">
                  <iframe
                    width="864"
                    height="486"
                    src={`https://www.youtube.com/embed/${item.key}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="object-fill rounded-lg"
                  ></iframe>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    if (type === "similar")
      return (
        <div className="py-10">
          <h2 className="text-3xl font-medium mb-10">Similar movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
  }
  return null;
}

export default MovieDetailsPage;
