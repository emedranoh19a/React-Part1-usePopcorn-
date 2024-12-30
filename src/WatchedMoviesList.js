import styled from "styled-components";

export default function WatchedMoviesList({ watched, onDeleteWatch }) {
  return (
    <StyledList>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatch={onDeleteWatch}
        />
      ))}
    </StyledList>
  );
}

function WatchedMovie({ movie, onDeleteWatch }) {
  return (
    <li key={movie.imdbID}>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
      <DeleteButton onClick={() => onDeleteWatch(movie.imdbID)}>X</DeleteButton>
    </li>
  );
}

const StyledList = styled.ul`
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
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 2.4rem;

  height: 1.8rem;
  aspect-ratio: 1;
  border-radius: 50%;
  border: none;
  background-color: var(--color-red);
  color: var(--color-background-900);
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background-color: var(--color-red-dark);
  }
`;
