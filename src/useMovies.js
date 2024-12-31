import { useState, useEffect } from "react";

const API_Key = "68b66c15";



export function useMovies(query) {
  // const [movies, setMovies] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState(""); //it is the error message

  // const url =`http://www.omdbapi.com/?apikey=${API_Key}&s=${query}`

  // useEffect(
  //   function () {
  //     // const controller = new AbortController();
  //     async function fetchMovies() {
  //       try {
  //         setError("");
  //         setIsLoading(true);
  //         const res = await fetch(
  //           url,
  //           // { signal: controller.signal }
  //         );

  //         if (!res.ok)
  //           //We might have to refresh to test this one. Error does not re-render, because it is not handled yet.
  //           throw new Error("Something went wrong with fetching movies");

  //         const data = await res.json(); //Data came, but might be wrong
  //         if (data.Response === "False") throw new Error("Movie not found");

  //         setMovies(data.Search);
  //         setError("");
  //       } catch (err) {
  //         if (!err.name !== "AbortError") setError(err.message);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     }
  //     if (query.length < 3) {
  //       setMovies([]);
  //       setError("");
  //       return;
  //     }
  //     fetchMovies();

  //     // return function () {
  //     //   controller.abort();
  //     // };
  //   },
  //   [query]
  // );
  const movies = [];
  const isLoading = false;
  const error = "";
  // fetchMovies(query)

  useEffect(() => {
    async function fetchMovies() {
      const url = `http://www.omdbapi.com/?apikey=${API_Key}&s=${query}`;
    
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Something went wrong with the request: " + response.statusText
            );
          }
          return response.json();
        })
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
    fetchMovies();
    // const result  await fetchMovies(query);
    // console.log(result);
  }, [query]);
  return { movies, isLoading, error };
}
