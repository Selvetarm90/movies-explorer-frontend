import { useState } from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm({ searchMovies }) {
  const [movieName, setMovieName] = useState('');
  const handleChangeMovieName = (evt) => {
    setMovieName(evt.target.value);
  };
  const handleSubmit = (evt) => {
    evt.preventDefault();
    searchMovies(movieName.toLowerCase());
    console.log(movieName)
  };

  return (
    <form className='search-form' onSubmit={handleSubmit}>
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
      <FilterCheckbox />
    </form>
  );
}
