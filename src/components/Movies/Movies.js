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
}) {
  const [viewMoviesList, setViewMoviesList] = useState(
    JSON.parse(localStorage.getItem('view-movies')) || [],
  );
  const [buttonMoreVisible, setbuttonMoreVisible] = useState(true);
  const [checkboxState, setCheckboxState] = useState(false);
  const [movieName, setMovieName] = useState(
    localStorage.getItem('movie-name') || '',
  );

  useEffect(() => {
    if (movies.length && !findedMovies.movies) {
      const savedMovieName = localStorage.getItem('movie-name');
      const savedViewMoviesList = JSON.parse(
        localStorage.getItem('view-movies'),
      );
      console.log(savedMovieName);
      console.log(savedViewMoviesList);
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
    console.log(findedMovies.movies);
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

      console.log(savedViewMoviesList);
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
  }, [findedMovies, moviesListLength]);

  useEffect(() => {
    console.log(findedMovies);
    console.log(viewMoviesList);
    const moviesList = findedMovies.filterMovies
      ? findedMovies.filterMovies
      : findedMovies.movies
      ? findedMovies.movies
      : findedMovies
      ? findedMovies
      : [];
    console.log(moviesList);
    if (
      viewMoviesList.length === movies.length ||
      viewMoviesList.length === moviesList.length
    ) {
      setbuttonMoreVisible(false);
    } else setbuttonMoreVisible(true);
  }, [viewMoviesList]);

  const startMoviesList = (movies, findedMovies) => {
    const viewMovies = [];
    console.log(movies);
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
      console.log('найденные фильмы');
      for (let i = 0; i <= moviesListLength - 1; i++) {
        viewMovies.push(findedMovies[i]);
      }
      setViewMoviesList(viewMovies);
      localStorage.setItem('view-movies', JSON.stringify(viewMovies));
      return;
    }
    if (findedMovies && !findedMovies?.length) {
      console.log('нету!!');
      setViewMoviesList([]);
      localStorage.removeItem('view-movies');

      return;
    }

    if (movies.length) {
      console.log(movies);
      console.log(viewMovies);
      for (let i = 0; i <= moviesListLength - 1; i++) {
        viewMovies.push(movies[i]);
      }
      setViewMoviesList(viewMovies);
      // localStorage.setItem('view-movies', JSON.stringify(viewMovies));
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

  const handleChangeCheckbox = (value) => {
    setCheckboxState(value);
    localStorage.setItem('checkbox', value);
    if (value) {
      filterMovies();
    } else {
      handleSearchMovies(movieName.toLowerCase(), false);
    }

    console.log(checkboxState);
  };

  const handleChangeMovieName = (value) => {
    setMovieName(value);
  };

  const handleSubmitSearchForm = () => {
    // localStorage.removeItem('view-movies');
    // setViewMoviesList([]);
    handleSearchMovies(movieName.toLowerCase(), checkboxState);
    localStorage.setItem('movie-name', movieName);
    console.log(movieName);
  };
  const changeSaveButtonStatus = (movie, movieList = viewMoviesList) => {
    console.log(movieList);
    console.log(viewMoviesList);
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
        console.log(movie);

        localStorage.setItem(
          'view-movies',
          JSON.stringify(changeSaveButtonStatus(movie)),
        );
        if (findedMovies.movies?.length) {
          console.log('сохранил найденое');
          localStorage.setItem(
            'finded-movies',
            JSON.stringify({
              movies: changeSaveButtonStatus(movie, findedMovies.movies),
            }),
          );
        }
        if (findedMovies.filterMovies?.length) {
          console.log('сохранил фильтрованое');
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
        checkboxState={checkboxState}
      />
      <MoviesCardList
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
        moviesList={viewMoviesList}
        isLoading={isLoading}
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
