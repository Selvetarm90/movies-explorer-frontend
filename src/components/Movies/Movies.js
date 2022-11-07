import './Movies.css';
import { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({
  handleSaveMovie,
  buttonSavedStatus,
  movies,
  findedMovies,
  handleSearchMovies,
}) {
  const [viewMoviesList, setViewMoviesList] = useState([]);
  const [buttonMoreVisible, setbuttonMoreVisible] = useState(true);
  const [checkboxState, setCheckboxState] = useState(false);
  const [movieName, setMovieName] = useState('');

  // const findedMovies = [];

  // useEffect(() => {
  //   console.log(movies)
  //   setMoviesList(movies);
  //   startMoviesList(movies);
  // }, [movies]);

  // useEffect(() => {
  //   const savedMovieName = localStorage.getItem('movie-name');
  //   console.log(savedMovieName)
  //   if (savedMovieName) {
  //     handleSearchMovies(movieName.toLowerCase(), checkboxState);
  //   }
  // }, [movies]);

  useEffect(() => {
    const savedMovieName = localStorage.getItem('movie-name');
    console.log(savedMovieName)
    if (savedMovieName) {
      handleSearchMovies(savedMovieName.toLowerCase(), checkboxState);
      return
    }
    if (movies.length) {
      console.log(movies);
      startMoviesList(movies, findedMovies);
      console.log(findedMovies);
    }
  }, [movies]);

  useEffect(() => {
    if(true){
      startMoviesList(movies, findedMovies);
    }

  }, [findedMovies])

  useEffect(() => {
    if (viewMoviesList.length === movies.length) {
      setbuttonMoreVisible(false);
    } else setbuttonMoreVisible(true);
  }, [viewMoviesList]);

  useEffect(() => {
    if (checkboxState) {
      handleSearchMovies(movieName);
    }
  }, [checkboxState, movieName]);

  const startMoviesList = (movies, findedMovies) => {
    //setMoviesList(movies)
    const viewMovies = [];
    const savedMovieName = localStorage.getItem('movie-name');

      if (!movieName && !savedMovieName) {
        if (movies.length <= 12 && movies.length) {
          setViewMoviesList(movies);
          return;
        }
        if (movies.length) {
          for (let i = 0; i <= 11; i++) {
            viewMovies.push(movies[i]);
          }
          setViewMoviesList(viewMovies);
        }
        return;
      }

      if (findedMovies.length <= 12 && findedMovies.length) {
        setViewMoviesList(findedMovies);
        return;
      }

    if (findedMovies.length) {
      console.log('123')
      for (let i = 0; i <= 11; i++) {
        viewMovies.push(findedMovies[i]);
      }
      setViewMoviesList(viewMovies);
      return
    }
    if (!findedMovies.length) {
      console.log('нету!!')
    }

    console.log(viewMovies);
  };

  const handleClickButtonMore = () => {
    const addedMovies = [];
    const handleMovies = findedMovies.length ? findedMovies : movies;

    for (let i = viewMoviesList.length; i <= viewMoviesList.length + 2; i++) {
      console.log(viewMoviesList.length);
      if (handleMovies[i]) {
        addedMovies.push(handleMovies[i]);
      }
    }
    console.log(addedMovies);
    console.log(viewMoviesList);
    setViewMoviesList(viewMoviesList.concat(addedMovies));
  };

  // const handleSearchMovies = (text) => {
  //   setMoviesList([]);
  //   setViewMoviesList([]);
  //   if (checkboxState) {
  //     setMoviesList(
  //       moviesList.filter(
  //         (item) =>
  //           item.duration < 40 && item.nameRU.toLowerCase().includes(text),
  //       ),
  //     );
  //   } else {
  //     setMoviesList(
  //       movies.filter((item) => item.nameRU.toLowerCase().includes(text)),
  //     );
  //   }

  //   console.log(moviesList);
  //   // startMoviesList(moviesList);
  // };

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
    // setViewMoviesList([]);
    handleSearchMovies(movieName.toLowerCase(), checkboxState);
    localStorage.setItem('movie-name', movieName);
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
