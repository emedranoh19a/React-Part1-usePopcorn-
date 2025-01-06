import React from "react";

import { useState, useEffect } from "react";
import { useKey } from "./useKey";

import StarRating from "./StarRating";
import Loader from "./Loader";
import styled from "styled-components";
//TODO: get rid of this key, and prepare it for netlify
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
          `https://www.omdbapi.com/?apikey=${API_Key}&i=${selectedId}`
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
    <Details>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <MovieDetailsHeader movie={movie} onCloseMovie={onCloseMovie} />
          <section>
            <Rating>
              <StarRating
                maxRating={10}
                size={24}
                onSetRating={setUserRating}
                defaultRating={movieRating ? movieRating : 0}
              />

              {!movieRating && userRating && (
                <ButtonAdd onClick={handleAdd}>+ Add to List</ButtonAdd>
              )}
            </Rating>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </Details>
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
      <StyledBackButton onClick={onCloseMovie}>&larr;</StyledBackButton>
      <img src={poster} alt={`Poster of ${movie}`} />
      <DetailsOverview>
        <h2>{title}</h2>
        <p>
          {released} &bull; {runtime}
        </p>
        <p>{genre}</p>
        <p>
          <span>⭐️</span> {imdbRating} IMDb rating
        </p>
      </DetailsOverview>
    </header>
  );
}

const StyledBackButton = styled.button`
  position: absolute;
  top: 0.6rem;
  left: 0.6rem;
  height: 3.2rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  /* background-color: var(--color-text); */
  background-color: #fff;
  color: var(--color-background-500);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.8);
  font-family: sans-serif;
  font-size: 2.4rem;
  font-weight: bold;
  cursor: pointer;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailsOverview = styled.div`
  width: 100%;
  padding: 2.4rem 3rem;
  background-color: var(--color-background-100);
  display: flex;
  flex-direction: column;
  gap: 1.4rem;

  & h2 {
    font-size: 2.4rem;
    margin-bottom: 0.4rem;
    line-height: 1.1;
  }

  & p {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
`;

const ButtonAdd = styled.button`
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: 10rem;
  font-size: 1.4rem;
  padding: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-primary-light);
  }
`;

const Rating = styled.div`
  background-color: var(--color-background-100);
  border-radius: 0.9rem;
  padding: 2rem 2.4rem;
  margin-bottom: 0.8rem;
  font-weight: 600;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const Details = styled.div`
  line-height: 1.4;
  font-size: 1.4rem;

  & header {
    display: flex;
  }

  & section {
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
  }

  & img {
    width: 33%;
  }
`;
