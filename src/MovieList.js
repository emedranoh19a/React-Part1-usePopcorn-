import styled from "styled-components"
import StyledList from "./StyledList"

export default function MovieList({ movies, onSelectMovie }) {
  return (
    <ListListMovies>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ListListMovies>
  );
}

function Movie({ movie, onSelectMovie }) {
  return (
    <li
      key={movie.imdbID}
      onClick={() => {
        onSelectMovie(movie.imdbID);
      }}
    >
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

const ListListMovies = styled(StyledList)`
  list-style: none;
  padding: 0.8rem 0;
  overflow: scroll;

  & li {
    position: relative;
    display: grid;
    grid-template-columns: 4rem 1fr;
    grid-template-rows: auto auto;
    column-gap: 2.4rem;
    font-size: 1.6rem;
    align-items: center;

    padding: 1.6rem 3.2rem;
    border-bottom: 1px solid var(--color-background-100);
  }

  & img {
    width: 100%;
    grid-row: 1 / -1;
  }

  & h3 {
    font-size: 1.8rem;
  }

  & div {
    display: flex;
    align-items: center;
    gap: 2.4rem;
  }

  & p {
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }
& li {
  cursor: pointer;
  transition: all 0.3s;
}

& li:hover {
  background-color: var(--color-background-100);
}
`