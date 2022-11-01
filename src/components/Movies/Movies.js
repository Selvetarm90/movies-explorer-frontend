import './Movies.css';
import { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({ handleSaveMovie, buttonSavedStatus, movies }) {
  const [moviesList, setMoviesList] = useState([]);
  const [viewMoviesList, setViewMoviesList] = useState([]);
  const [buttonMoreVisible, setbuttonMoreVisible] = useState(true);
  const [checkboxState, setCheckboxState] = useState(false);
  const [movieName, setMovieName] = useState('');

  useEffect(() => {
    console.log(movies)
    setMoviesList(movies);
    startMoviesList(movies);
  }, [movies]);

  useEffect(() => {
    startMoviesList(moviesList);
  }, [moviesList]);

  useEffect(() => {
    if (viewMoviesList.length === moviesList.length) {
      setbuttonMoreVisible(false);
    } else setbuttonMoreVisible(true);
  }, [viewMoviesList, moviesList]);

  useEffect(() => {
    handleSearchMovies(movieName);
  }, [checkboxState]);

  const startMoviesList = (movies) => {
    //setMoviesList(movies)
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

  const handleClickButtonMore = () => {
    const addedMovies = [];
    for (let i = viewMoviesList.length; i <= viewMoviesList.length + 2; i++) {
      console.log(moviesList.length);
      console.log(viewMoviesList.length);
      if (moviesList[i]) {
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
    if (checkboxState) {
      setMoviesList(moviesList.filter((item) => item.duration < 40));
    } else {
      setMoviesList(
        movies.filter((item) => item.nameRU.toLowerCase().includes(text)),
      );
    }

    console.log(moviesList);
    // startMoviesList(moviesList);
  };

  // const searchMoviesWithCheckbox = () => {
  //   if (checkboxState) {

  //     setMoviesList(moviesList.filter((item) => item.duration < 40));
  //   } else
  //     setMoviesList(
  //       movies.filter((item) => item.nameRU.toLowerCase().includes(text)),
  //     );
  // };

  const handleChangeCheckbox = (evt) => {
    setCheckboxState(evt.target.checked);
    console.log(checkboxState);
  };

  const handleChangeMovieName = (evt) => {
    setMovieName(evt.target.value);
  };

  const handleSubmitSearchForm = (evt) => {
    evt.preventDefault();
    handleSearchMovies(movieName.toLowerCase());
    console.log(movieName);
  };

  return (
    <main className='movies'>
      <SearchForm
        // searchMovies={handleSearchMovies}
        handleChangeCheckbox={handleChangeCheckbox}
        handleChangeMovieName={handleChangeMovieName}
        handleSubmitSearchForm={handleSubmitSearchForm}
        movieName={movieName}
      />
      <MoviesCardList
        handleSaveMovie={handleSaveMovie}
        buttonSavedStatus={buttonSavedStatus}
        moviesList={viewMoviesList}
      />
      <button
        type='button'
        className={`movies__button-more ${
          !buttonMoreVisible ? 'movies__button-more_unactive' : ''
        }`}
        onClick={handleClickButtonMore}
      >
        Ещё
      </button>
    </main>
  );
}
