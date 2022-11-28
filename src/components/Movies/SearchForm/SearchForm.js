import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({
  searchMovies,
  handleChangeCheckbox,
  handleChangeMovieName,
  handleSubmitSearchForm,
  movieName,
  movieNameSavedMovies,
  checkboxState,
  checkboxStateSavedMovies,
  handleSubmitSearchFormSavedMovies,
  handleChangeMovieNameSavedMovies,
  handleChangeCheckboxSavedMovies,
}) {
  const location = useLocation();
  // const [movieName, setMovieName] = useState('');
  // const handleChangeMovieName = (evt) => {
  //   setMovieName(evt.target.value);
  // };
  // const handleSubmitSearchForm = (evt) => {
  //   evt.preventDefault();
  //   searchMovies(movieName.toLowerCase());
  //   console.log(movieName)
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(location.pathname);
    if (location.pathname === '/movies') {
      handleSubmitSearchForm();
      return;
    }
    if (location.pathname === '/saved-movies') {
      handleSubmitSearchFormSavedMovies();
    }
  };

  const changeMovieName = (evt) => {
    if (location.pathname === '/movies') {
      handleChangeMovieName(evt.target.value);
    }
    if (location.pathname === '/saved-movies') {
      handleChangeMovieNameSavedMovies(evt.target.value);
    }
  };

  const changeCheckbox = (evt) => {
    if (location.pathname === '/movies') {
      handleChangeCheckbox(evt.target.checked);
    }
    if (location.pathname === '/saved-movies') {
      handleChangeCheckboxSavedMovies(evt.target.checked);
    }
  };

  const handleCheckboxState = () => {
    if (location.pathname === '/movies') {
      return checkboxState;
    }
    if (location.pathname === '/saved-movies') {
      return checkboxStateSavedMovies;
    }
  };

  return (
    <form className='search-form' onSubmit={handleSubmit} noValidate>
      <input
        type='text'
        className='search-form__input'
        value={
          location.pathname === '/movies' ? movieName : movieNameSavedMovies
        }
        onChange={changeMovieName}
        required
        placeholder='Фильм'
      />
      <button className='search-form__button' type='submit'>
        Найти
      </button>
      <FilterCheckbox
        handleChangeCheckbox={changeCheckbox}
        checkboxState={
          location.pathname === '/movies'
            ? checkboxState
            : checkboxStateSavedMovies
        }
      />
    </form>
  );
}
