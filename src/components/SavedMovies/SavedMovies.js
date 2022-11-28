import { useEffect, useState } from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies({ movies, handleDeleteMovie }) {
  const [checkboxStateSavedMovies, setCheckboxStateSavedMovies] = useState(
    localStorage.getItem('saved-movies-checkbox') === 'true',
  );
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [shortSavedMovies, setShortSavedMovies] = useState([]);
  const [movieNameSavedMovies, setMovieNameSavedMovies] = useState(
    localStorage.getItem('saved-movie-name'),
  );

  useEffect(() => {
    if (movies.length) {
      searchSavedMovies(checkboxStateSavedMovies);
    }
  }, [movies]);

  const searchSavedMovies = (checked = checkboxStateSavedMovies) => {
    localStorage.setItem('saved-movie-name', movieNameSavedMovies);
    localStorage.setItem('saved-movies-checkbox', checked);
    console.log(movieNameSavedMovies);
    let text = movieNameSavedMovies === '' ? '' : movieNameSavedMovies;
    if (checked) {
      const moviesList = movies.filter(
        (m) => m.nameRU.toLowerCase().includes(text) && m.duration < 40,
      );
      setShortSavedMovies(moviesList);
      localStorage.setItem('saved-movies-short', shortSavedMovies);
      console.log(moviesList);
    } else {
      const moviesList = movies.filter((m) =>
        m.nameRU.toLowerCase().includes(text),
      );
      setFilteredSavedMovies(moviesList);
      localStorage.setItem('saved-movies-finded', filteredSavedMovies);
      console.log(moviesList);
    }
  };

  const changeCheckboxStatus = (checked) => {
    setCheckboxStateSavedMovies(checked);
    searchSavedMovies(checked);
  };

  const changeMovieNameSavedMovies = (text) => {
    setMovieNameSavedMovies(text);
    //searchSavedMovies();
  };

  return (
    <main className='saved-movies'>
      <SearchForm
        handleSubmitSearchFormSavedMovies={searchSavedMovies}
        handleChangeMovieNameSavedMovies={changeMovieNameSavedMovies}
        handleChangeCheckboxSavedMovies={changeCheckboxStatus}
        checkboxStateSavedMovies={checkboxStateSavedMovies}
        movieNameSavedMovies={movieNameSavedMovies}
      />
      <MoviesCardList
        buttonSavedCard={true}
        handleDeleteMovie={handleDeleteMovie}
        moviesList={
          checkboxStateSavedMovies ? shortSavedMovies : filteredSavedMovies
        }
      />
    </main>
  );
}
