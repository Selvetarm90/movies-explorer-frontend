import './Movies.css';
import { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({ movies }) {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    startMoviesList(movies);
  }, [movies]);

  const startMoviesList = (movies) => {
    const viewMovies = [];
    if (movies.length > 0) {
      for (let i = 0; i <= 11; i++) {
        viewMovies.push(movies[i]);
      }
      setMoviesList(viewMovies);
    }
  };

  const handleClick = () => {
    const addedMovies = [];
    for (let i = moviesList.length; i <= moviesList.length + 2; i++) {
      addedMovies.push(movies[i]);
    }
    setMoviesList(moviesList.concat(addedMovies));
  };

  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList moviesList={moviesList} />
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
