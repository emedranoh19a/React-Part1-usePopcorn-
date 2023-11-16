import React from "react";

import { useState, useEffect } from "react";
import { useKey } from "./useKey";

import StarRating from "./StarRating";
import Loader from "./Loader";

const API_Key = "68b66c15";

export default function MovieDetails({
  selectedId,
  onCloseMovie,
  onAddWatch,
  onGetRating,
  watched,
}) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState();

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Director: director,
  } = movie;
  //The API works differently, with detailed info about 1 movie.
  //Effect triggers on every re-render

  //If it has a rating, it means it is watched
  const movieRating = onGetRating(selectedId);
  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: imdbRating ? Number(imdbRating) : 0,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatch(newWatchedMovie);
    onCloseMovie();
  }

  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${API_Key}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
      setUserRating(null);
    },
    [selectedId]
  );
  //on mount
  useEffect(
    function () {
      document.title = title;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );
  useKey("Enter", onCloseMovie);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieDetailsHeader movie={movie} onCloseMovie={onCloseMovie} />
          <section>
            <div className="rating">
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
                defaultRating={movieRating ? movieRating : 0}
              />

              {!movieRating && userRating && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to List
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}

function MovieDetailsHeader({ movie, onCloseMovie }) {
  const {
    Title: title,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Released: released,
    Genre: genre,
  } = movie;

  return (
    <header>
      <button className="btn-back" onClick={onCloseMovie}>
        &larr;
      </button>
      <img src={poster} alt={`Poster of ${movie}`} />
      <div className="details-overview">
        <h2>{title}</h2>
        <p>
          {released} &bull; {runtime}
        </p>
        <p>{genre}</p>
        <p>
          <span>⭐️</span> {imdbRating} IMDb rating
        </p>
      </div>
    </header>
  );
}
