import { useState, useEffect } from "react";
import axios from "axios";

export function useMovies(query: string) {
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [netError, setNetError] = useState(null);
  const [moviesFound, setMoviesFound] = useState(true);

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    const fetchMovies = async function () {
      try {
        if (query && !netError) setIsLoading(true);

        const res = await axios.get(
          `http://www.omdbapi.com/?apikey=120a7fbf&s=${query}`,
          {
            cancelToken: cancelToken.token,
          }
        );
        setNetError(null);
        setMovieList(res.data.Error ? [] : res.data.Search);
        setMoviesFound(res.data.Error ? false : true);
      } catch (err) {
        if (axios.isCancel(err)) console.log("Canceling!");
        else {
          console.log(err);
          setNetError("You are offline 😿");
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query) fetchMovies();

    return () => {
      cancelToken.cancel("Cancelled!");
    };
  }, [query, setMovieList]);

  return { movieList, isLoading, netError, setMovieList, moviesFound };
}
