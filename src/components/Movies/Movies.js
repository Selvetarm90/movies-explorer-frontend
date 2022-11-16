import './Movies.css';
import { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import * as mainApi from '../../utils/MainApi';

export default function Movies({
  movies,
  findedMovies,
  handleSearchMovies,
  addInSavedMovies,
}) {
  const [viewMoviesList, setViewMoviesList] = useState([]);
  const [buttonMoreVisible, setbuttonMoreVisible] = useState(true);
  const [checkboxState, setCheckboxState] = useState(false);
  const [movieName, setMovieName] = useState('');



  useEffect(() => {
    if (movies.length && !findedMovies.movies) {
      const savedMovieName = localStorage.getItem('movie-name');
      const savedViewMoviesList = JSON.parse(
        localStorage.getItem('view-movies'),
      );
      console.log(savedMovieName);
      console.log(savedViewMoviesList);
      if (savedMovieName) {
        handleSearchMovies(savedMovieName.toLowerCase(), checkboxState);
        return;
      }
      if (savedViewMoviesList?.length) {
        setViewMoviesList(savedViewMoviesList);
        return;
      }
      if (movies.length) {
        console.log(movies);
        startMoviesList(movies, findedMovies.movies);
        console.log(findedMovies);
      }
    }
  }, [movies]);

  useEffect(() => {
    if (checkboxState) {
      const savedMovieName = localStorage.getItem('movie-name');
      console.log(movieName)
      console.log(savedMovieName)
      handleSearchMovies(movieName || savedMovieName, checkboxState);
    }
    else{
      startMoviesList(movies, findedMovies.movies)
    }
  }, [checkboxState]);

  useEffect(() => {
    console.log(findedMovies.movies);
    const savedViewMoviesList = JSON.parse(
      localStorage.getItem('view-movies'),
    );
    if (savedViewMoviesList?.length) {
      setViewMoviesList(savedViewMoviesList);
      return;
    }
    if (findedMovies.movies) {
      startMoviesList(movies, findedMovies.movies);
    }
  }, [findedMovies]);

  useEffect(() => {
    const moviesList = findedMovies.movies ? findedMovies.movies : [];
    if (
      viewMoviesList.length === movies.length ||
      viewMoviesList.length === moviesList.length
    ) {
      setbuttonMoreVisible(false);
    } else setbuttonMoreVisible(true);
  }, [viewMoviesList]);



  const startMoviesList = (movies, findedMovies) => {
    const viewMovies = [];
    const savedMovieName = localStorage.getItem('movie-name');

    if (!movieName && !savedMovieName) {
      if (movies.length <= 12 && movies.length) {
        localStorage.setItem('view-movies', JSON.stringify(movies));
        setViewMoviesList(movies);
        return;
      }

    }

    if (findedMovies?.length && findedMovies.length <= 12  ) {
      localStorage.setItem('view-movies', JSON.stringify(findedMovies));
      setViewMoviesList(findedMovies);
      return;
    }

    if (findedMovies?.length) {
      console.log('найденные фильмы');
      for (let i = 0; i <= 11; i++) {
        viewMovies.push(findedMovies[i]);
      }
      setViewMoviesList(viewMovies);
      localStorage.setItem('view-movies', JSON.stringify(viewMovies));
      return;
    }
    if (findedMovies && !findedMovies?.length) {
      console.log('нету!!');
      return
    }

    if (movies.length) {
      for (let i = 0; i <= 11; i++) {
        viewMovies.push(movies[i]);
      }
      setViewMoviesList(viewMovies);
      localStorage.setItem('view-movies', JSON.stringify(viewMovies));
      return;
    }

    console.log(viewMovies);
  };

  const handleClickButtonMore = () => {
    const addedMovies = [];
    const handleMovies = findedMovies.movies ? findedMovies.movies : movies;

    for (let i = viewMoviesList.length; i <= viewMoviesList.length + 2; i++) {
      console.log(viewMoviesList.length);
      if (handleMovies[i]) {
        addedMovies.push(handleMovies[i]);
      }
    }
    console.log(addedMovies);
    console.log(viewMoviesList);
    localStorage.setItem(
      'view-movies',
      JSON.stringify(viewMoviesList.concat(addedMovies)),
    );
    console.log(JSON.parse(localStorage.getItem('view-movies')));
    setViewMoviesList(viewMoviesList.concat(addedMovies));
  };

  const handleChangeCheckbox = (evt) => {
    setCheckboxState(evt.target.checked);
    localStorage.setItem('checkbox', evt.target.checked);

    console.log(checkboxState);
  };

  const handleChangeMovieName = (evt) => {
    setMovieName(evt.target.value);
  };

  const handleSubmitSearchForm = (evt) => {
    evt.preventDefault();
   // localStorage.removeItem('view-movies');
    // setViewMoviesList([]);
    handleSearchMovies(movieName.toLowerCase(), checkboxState);
    localStorage.setItem('movie-name', movieName);
    console.log(movieName);
  };
  const changeSaveButtonStatus = (movie) => {
    return viewMoviesList.map((m) =>
      m.id === movie.movieId ? { buttonStatusSave: true, ...m } : m,
    );
  };

  const handleSaveMovie = (data) => {
    const token = localStorage.getItem('jwt');
    mainApi
      .addMovie(data, token)
      .then((movie) => {
        console.log(movie);

        localStorage.setItem(
          'view-movies',
          JSON.stringify(changeSaveButtonStatus(movie)),
        );
        console.log(JSON.parse(localStorage.getItem('view-movies')));

        setViewMoviesList(() => changeSaveButtonStatus(movie));
        addInSavedMovies(movie);
      })
      .catch((err) => console.log(err));
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
