import { useState } from 'react';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies({
  movies,
  handleDeleteMovie,
  handleSearchSavedMovies,
  handleChangeMovieNameSavedMovies,
  findedSavedMovies,
}) {

  const [checkboxStateSavedMovies, setCheckboxStateSavedMovies] = useState(false);
  const handleMovies = () => {
    if (findedSavedMovies.length) {
      return findedSavedMovies;
    } else return movies;
  };

  const changeCheckboxStatus = (value) => {
    setCheckboxStateSavedMovies(value);
  }

  return (
    <main className='saved-movies'>
      <SearchForm
        handleSubmitSearchFormSavedMovies={handleSearchSavedMovies}
        handleChangeMovieNameSavedMovies={handleChangeMovieNameSavedMovies}
        handleChangeCheckboxSavedMovies={changeCheckboxStatus}
      />
      <MoviesCardList
        buttonSavedCard={true}
        handleDeleteMovie={handleDeleteMovie}
        moviesList={ movies }
      />
    </main>
  );
}
