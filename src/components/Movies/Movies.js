import './Movies.css';
import { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({ movies }) {
  const [moviesList, setMoviesList] = useState([]);
  const [viewMoviesList, setViewMoviesList] = useState([]);

  useEffect(() => {
    startMoviesList(movies);
  }, [movies]);

  useEffect(() => {
    startMoviesList(moviesList);
  }, [moviesList]);

  // useEffect(() => {
  //   startMoviesList(moviesList);
  // }, [viewMoviesList]);

  const startMoviesList = (movies) => {
    setMoviesList(movies)
    console.log(movies);
    const viewMovies = [];
    if (movies.length > 0) {
      if (movies.length <= 12) {
        setViewMoviesList(movies);
        return;
      }
      for (let i = 0; i <= 11; i++) {
        viewMovies.push(movies[i]);
      }
      setViewMoviesList(viewMovies);
    }
  };

  const handleClick = () => {
    const addedMovies = [];
    for (let i = viewMoviesList.length; i <= viewMoviesList.length + 2; i++) {
      console.log(moviesList.length);
      console.log(viewMoviesList.length);
      if (moviesList.length > viewMoviesList.length) {
        addedMovies.push(moviesList[i]);
      }
    }
    console.log(addedMovies);
    console.log(viewMoviesList);
    setViewMoviesList(viewMoviesList.concat(addedMovies));
  };

  const handleSearchMovies = (text) => {
    setMoviesList([]);
    setViewMoviesList([]);
    setMoviesList(
      movies.filter((item) => item.nameRU.toLowerCase().includes(text)),
    );
    console.log(moviesList);
    // startMoviesList(moviesList);
  };

  return (
    <main className='movies'>
      <SearchForm searchMovies={handleSearchMovies} />
      <MoviesCardList moviesList={viewMoviesList} />
      <button
        type='button'
        className='movies__button-more'
        onClick={handleClick}
      >
        Ещё
      </button>
    </main>
  );
}
