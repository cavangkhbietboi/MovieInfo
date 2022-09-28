import React from "react";
import { useNavigate } from "react-router-dom";
import { tmdbAPI } from "apiConfig/config";
import Button from "components/button/Button";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import LoadingSkeleton from "components/loading/LoadingSkeleton";

const MovieCard = ({ item }) => {
  const { title, vote_average, poster_path, id } = item;
  const navigate = useNavigate();
  return (
    <div
      className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none cursor-pointer"
      onClick={() => navigate(`/movie/${id}`)}
    >
      <img
        src={tmdbAPI.image500(poster_path)}
        alt=""
        className="w-full h-[250px] object-cover rounded-lg mb-5"
      />
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3 min-h-[60px]">{title}</h3>
        <div className="items-center justify-between text-sm opacity-50 mb-10 ">
          <span className="flex items-center gap-5 ">
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
            <span>{vote_average}</span>
          </span>
        </div>
        <Button bgColor="secondary">Watch now</Button>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    vote_average: PropTypes.number,
    release_date: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-400">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieCard, {
  FallbackComponent,
});

export const MovieCardSkeleton = () => {
  return (
    <div className="movie-card flex flex-col rounded-lg p-3 bg-slate-800 text-white h-full select-none">
      <LoadingSkeleton
        width="100%"
        height="250px"
        radius="8px"
        className="mb-5"
      ></LoadingSkeleton>
      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-3">
          <LoadingSkeleton width="100%" height="20px"></LoadingSkeleton>
        </h3>
        <div className="flex items-center justify-between text-sm opacity-50 mb-10">
          <span>
            <LoadingSkeleton width="50px" height="10px"></LoadingSkeleton>
          </span>
          <span>
            <LoadingSkeleton width="30px" height="10px"></LoadingSkeleton>
          </span>
        </div>
        <LoadingSkeleton
          width="100%"
          height="45px"
          radius="6px"
        ></LoadingSkeleton>
      </div>
    </div>
  );
};
