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

  // useEffect(() => {
  //   if (movies.length) {
  //     if (checkboxState) {
  //       const savedMovieName = localStorage.getItem('movie-name');

  //       filterMovies();

  //       // handleSearchMovies(movieName || savedMovieName, checkboxState);
  //     } else {
  //       startMoviesList(movies, findedMovies.movies);
  //     }
  //   }
  // }, [checkboxState]);

  useEffect(() => {
    console.log(findedMovies.movies);
    setCheckboxState(localStorage.getItem('checkbox') === 'true');
    const savedViewMoviesList = JSON.parse(localStorage.getItem('view-movies'));
    const savedFindedMovies = JSON.parse(localStorage.getItem('finded-movies'));

    if (savedFindedMovies?.filterMovies || findedMovies.filterMovies) {
      startMoviesList(movies, savedFindedMovies?.filterMovies || findedMovies.filterMovies);
      return;
    }

    if (savedViewMoviesList?.length) {
      setViewMoviesList(savedViewMoviesList);
      console.log(savedViewMoviesList);
      return;
    }

    if (savedFindedMovies?.movies || findedMovies.movies) {
      startMoviesList(movies, savedFindedMovies?.movies || findedMovies.movies);
      return;
    }
  }, [findedMovies]);

  useEffect(() => {
    console.log(findedMovies);
    console.log(viewMoviesList);
    const moviesList = findedMovies.movies
      ? findedMovies.movies
      : findedMovies.filterMovies
      ? findedMovies.filterMovies
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
      if (movies.length <= 12 && movies.length) {
        localStorage.setItem('view-movies', JSON.stringify(movies));
        setViewMoviesList(movies);
        setbuttonMoreVisible(false);
        return;
      }
    }

    if (findedMovies?.length && findedMovies.length <= 12) {
      localStorage.setItem('view-movies', JSON.stringify(findedMovies));
      setViewMoviesList(findedMovies);
      setbuttonMoreVisible(false);
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
      return;
    }

    if (movies.length) {
      console.log(movies);
      console.log(viewMovies);
      for (let i = 0; i <= 11; i++) {
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
      : movies;

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
    const checkboxStatus = evt.target.checked;
    setCheckboxState(checkboxStatus);
    localStorage.setItem('checkbox', checkboxStatus);
    if (checkboxStatus) {
      filterMovies();
    } else {
      handleSearchMovies(movieName.toLowerCase(), false);
    }

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
  const changeSaveButtonStatus = (movie, movieList = viewMoviesList) => {
    return movieList.map((m) =>
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
                findedMovies.filterMovies,
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

  const handleClickCheckbox = () => {};
  return (
    <main className='movies'>
      <SearchForm
        // searchMovies={handleSearchMovies}
        handleChangeCheckbox={handleChangeCheckbox}
        handleChangeMovieName={handleChangeMovieName}
        handleSubmitSearchForm={handleSubmitSearchForm}
        handleClickCheckbox={handleClickCheckbox}
        movieName={movieName}
        checkboxState={checkboxState}
      />
      <MoviesCardList
        handleSaveMovie={handleSaveMovie}
        handleDeleteMovie={handleDeleteMovie}
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
