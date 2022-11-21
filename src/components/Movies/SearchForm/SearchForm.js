import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({
  searchMovies,
  handleChangeCheckbox,
  handleChangeMovieName,
  handleSubmitSearchForm,
  movieName,
  checkboxState,
  handleClickCheckbox,
}) {
  // const [movieName, setMovieName] = useState('');
  // const handleChangeMovieName = (evt) => {
  //   setMovieName(evt.target.value);
  // };
  // const handleSubmitSearchForm = (evt) => {
  //   evt.preventDefault();
  //   searchMovies(movieName.toLowerCase());
  //   console.log(movieName)
  // };

  return (
    <form className='search-form' onSubmit={handleSubmitSearchForm}>
      <input
        type='text'
        className='search-form__input'
        value={movieName}
        onChange={handleChangeMovieName}
        required
        placeholder='Фильм'
      />
      <button className='search-form__button' type='submit'>
        Найти
      </button>
      <FilterCheckbox
        handleChangeCheckbox={handleChangeCheckbox}
        checkboxState={checkboxState}
        handleClickCheckbox={handleClickCheckbox}
      />
    </form>
  );
}
