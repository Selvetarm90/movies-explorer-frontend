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
    localStorage.getItem('saved-movie-name') || '',
  );

  useEffect(() => {
    searchSavedMovies(checkboxStateSavedMovies);
  }, [movies]);

  const searchSavedMovies = (checked = checkboxStateSavedMovies) => {
    localStorage.setItem('saved-movie-name', movieNameSavedMovies);
    localStorage.setItem('saved-movies-checkbox', checked);
    let text =
      movieNameSavedMovies === '' ? '' : movieNameSavedMovies.toLowerCase();
    if (checked) {
      const moviesList = movies.filter(
        (m) =>
          (m.nameRU.toLowerCase().includes(text) ||
            m.nameEN.toLowerCase().includes(text)) &&
          m.duration < 40,
      );
      setShortSavedMovies(moviesList);
    } else {
      const moviesList = movies.filter(
        (m) =>
          m.nameRU.toLowerCase().includes(text) ||
          m.nameEN.toLowerCase().includes(text),
      );
      setFilteredSavedMovies(moviesList);
    }
  };

  const changeCheckboxStatus = (checked) => {
    setCheckboxStateSavedMovies(checked);
    searchSavedMovies(checked);
  };

  const changeMovieNameSavedMovies = (text) => {
    setMovieNameSavedMovies(text);
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
