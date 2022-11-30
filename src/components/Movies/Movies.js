import './Movies.css';
import { useEffect, useState } from 'react';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';
import * as mainApi from '../../utils/MainApi';

export default function Movies({
  movies,
  findedMovies,
  filterMovies,
  handleSearchMovies,
  handleDeleteMovie,
  addInSavedMovies,
  moviesListLength,
  addMoviesLength,
  isLoading,
  message,
  handleSetMessage,
}) {
  const [viewMoviesList, setViewMoviesList] = useState(
    JSON.parse(localStorage.getItem('view-movies')) || [],
  );
  const [buttonMoreVisible, setbuttonMoreVisible] = useState(true);
  const [checkboxState, setCheckboxState] = useState(
    localStorage.getItem('checkbox') === 'true',
  );
  const [movieName, setMovieName] = useState(
    localStorage.getItem('movie-name') || '',
  );

  useEffect(() => {
    if (movies.length && !findedMovies.movies) {
      const savedMovieName = localStorage.getItem('movie-name');
      const savedViewMoviesList = JSON.parse(
        localStorage.getItem('view-movies'),
      );
      if (savedViewMoviesList?.length) {
        setViewMoviesList(savedViewMoviesList);
        return;
      }
      if (savedMovieName) {
        handleSearchMovies(savedMovieName.toLowerCase(), checkboxState);
        return;
      }
      if (movies.length) {
        startMoviesList(movies, findedMovies.movies);
      }
    }
  }, [movies]);

  useEffect(() => {
    setCheckboxState(localStorage.getItem('checkbox') === 'true');
    const savedViewMoviesList = JSON.parse(localStorage.getItem('view-movies'));
    const savedFindedMovies = JSON.parse(localStorage.getItem('finded-movies'));

    if (savedFindedMovies?.filterMovies || findedMovies.filterMovies) {
      startMoviesList(
        movies,
        savedFindedMovies?.filterMovies || findedMovies.filterMovies,
      );
      return;
    }
    if (savedViewMoviesList?.length) {
      setViewMoviesList(savedViewMoviesList);
      return;
    }
    if (savedFindedMovies?.length || findedMovies.length) {
      startMoviesList(movies, findedMovies || savedFindedMovies);
      return;
    }
    if (savedFindedMovies?.movies || findedMovies.movies) {
      startMoviesList(movies, savedFindedMovies?.movies || findedMovies.movies);
      return;
    }
  }, [findedMovies]);

  useEffect(() => {
    const moviesList = findedMovies.filterMovies
      ? findedMovies.filterMovies
      : findedMovies.movies
      ? findedMovies.movies
      : findedMovies
      ? findedMovies
      : [];
    if (
      viewMoviesList.length === movies.length ||
      viewMoviesList.length === moviesList.length
    ) {
      setbuttonMoreVisible(false);
    } else setbuttonMoreVisible(true);
  }, [viewMoviesList]);

  useEffect(() => {
    if (movies.length && viewMoviesList.length) {
      handleSearchMovies(movieName.toLowerCase(), checkboxState);
    }
  }, [moviesListLength]);

  const startMoviesList = (movies, findedMovies) => {
    const viewMovies = [];
    const savedMovieName = localStorage.getItem('movie-name');
    if (!movieName && !savedMovieName) {
      if (movies.length <= moviesListLength && movies.length) {
        localStorage.setItem('view-movies', JSON.stringify(movies));
        setViewMoviesList(movies);
        setbuttonMoreVisible(false);
        return;
      }
    }
    if (findedMovies?.length && findedMovies.length <= moviesListLength) {
      localStorage.setItem('view-movies', JSON.stringify(findedMovies));
      setViewMoviesList(findedMovies);
      setbuttonMoreVisible(false);
      return;
    }
    if (findedMovies?.length) {
      for (let i = 0; i <= moviesListLength - 1; i++) {
        viewMovies.push(findedMovies[i]);
      }
      setViewMoviesList(viewMovies);
      localStorage.setItem('view-movies', JSON.stringify(viewMovies));
      return;
    }
    if (findedMovies && !findedMovies?.length) {
      setViewMoviesList([]);
      localStorage.removeItem('view-movies');
      return;
    }
    if (movies.length) {
      for (let i = 0; i <= moviesListLength - 1; i++) {
        viewMovies.push(movies[i]);
      }
      setViewMoviesList(viewMovies);
    }
  };

  const handleClickButtonMore = () => {
    const addedMovies = [];
    const handleMovies = findedMovies.movies
      ? findedMovies.movies
      : findedMovies.filterMovies
      ? findedMovies.filterMovies
      : findedMovies.length
      ? findedMovies
      : movies;

    for (
      let i = viewMoviesList.length;
      i <= viewMoviesList.length + addMoviesLength - 1;
      i++
    ) {
      if (handleMovies[i]) {
        addedMovies.push(handleMovies[i]);
      }
    }

    localStorage.setItem(
      'view-movies',
      JSON.stringify(viewMoviesList.concat(addedMovies)),
    );
    setViewMoviesList(viewMoviesList.concat(addedMovies));
  };

  const handleChangeCheckbox = (value) => {
    setCheckboxState(value);
    localStorage.setItem('checkbox', value);
    if (value) {
      filterMovies();
    } else {
      handleSearchMovies(movieName.toLowerCase(), false);
    }
  };

  const handleChangeMovieName = (value) => {
    setMovieName(value);
  };

  const handleSubmitSearchForm = () => {
    handleSearchMovies(movieName.toLowerCase(), checkboxState);
    localStorage.setItem('movie-name', movieName);
  };
  const changeSaveButtonStatus = (movie, movieList = viewMoviesList) => {
    return movieList.map((m) =>
      m.id === movie.movieId ? { buttonStatusSave: true, ...m } : m,
    );
  };

  const handleSaveMovie = (data) => {
    const token = localStorage.getItem('jwt');
    const savedFindedMovies = JSON.parse(localStorage.getItem('finded-movies'));
    mainApi
      .addMovie(data, token)
      .then((movie) => {
        localStorage.setItem(
          'view-movies',
          JSON.stringify(changeSaveButtonStatus(movie)),
        );
        if (findedMovies.movies?.length) {
          localStorage.setItem(
            'finded-movies',
            JSON.stringify({
              movies: changeSaveButtonStatus(movie, findedMovies.movies),
            }),
          );
        }
        if (findedMovies.filterMovies?.length) {
          localStorage.setItem(
            'finded-movies',
            JSON.stringify({
              filterMovies: changeSaveButtonStatus(
                movie,
                savedFindedMovies?.filterMovies || findedMovies.filterMovies,
              ),
            }),
          );
        }
        setViewMoviesList(() => changeSaveButtonStatus(movie));

        addInSavedMovies(movie);
        handleSetMessage('');
      })
      .catch((err) => {
        handleSetMessage('Что-то пошло не так.');
        console.log(err);
      });
  };

  return (
    <main className='movies'>
      <SearchForm
        handleChangeCheckbox={handleChangeCheckbox}
        handleChangeMovieName={handleChangeMovieName}
        handleSubmitSearchForm={handleSubmitSearchForm}
        movieName={movieName}
        checkboxState={checkboxState}
        isLoading={isLoading}
      />
      <MoviesCardList
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        moviesList={viewMoviesList}
        isLoading={isLoading}
        message={message}
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
