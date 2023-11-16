import { useState } from "react";
import { useMovies } from "./useMovies.js";
import { useLocalStorageState } from "./useLocalStorageState.js";
import NavBar from "./NavBar.js";
import Logo from "./Logo.js";
import Search from "./Search.js";
import NumResults from "./NumResults.js";
import Box from "./Box.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import ErrorMessage from "./ErrorMessage.js";
import WatchedMoviesList from "./WatchedMoviesList.js";
import MovieDetails from "./MovieDetails.js";
import WatchedSummary from "./WatchedSummary.js";
import MovieList from "./MovieList.js";

export default function App() {
  const [query, setQuery] = useState("");
  // const [watched, setWatched] = useState(() =>
  //   JSON.parse(localStorage.getItem("watched"))
  // ); //Has to do with setting watched movies
  const { movies, isLoading, error } = useMovies(query);
  const [selectedId, setSelectedId] = useState("");
  const [watched, setWatched] = useLocalStorageState([], "watched");
  function handleSelectMovie(id) {
    setSelectedId((s) => (s === id ? null : id));
  }
  function handleCloseMovie() {
    setSelectedId(null);
  }
  function handleAddWatch(movie) {
    setWatched((watchedMovies) => [...watchedMovies, movie]);
  }
  function handleDeleteWatch(movieId) {
    setWatched((prevWatched) =>
      prevWatched.filter((m) => m.imdbID !== movieId)
    );
  }
  function getRating(id) {
    const foundMovie = watched.find((movie) => movie.imdbID === id);
    return foundMovie ? foundMovie.userRating : null;
  }

  // useEffect(
  //   function () {
  //     localStorage.setItem("watched", JSON.stringify(watched));
  //   },
  //   [watched]
  // );
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} onSetQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
          {/*Necesitamos analizar esta lógica muy bien.
          Probablemente sea mejor usar un switch
          */}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatch={handleAddWatch}
              onGetRating={getRating}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                watched={watched}
                onDeleteWatch={handleDeleteWatch}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
