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
  const [buttonSavedStatus, setButtonSavedStatus] = useState([]);

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
    if (movies.length && !findedMovies.movies) {
      const savedMovieName = localStorage.getItem('movie-name');
      const savedViewMoviesList = JSON.parse(
        localStorage.getItem('view-movies'),
      );
      //localStorage.removeItem('view-movies');
      console.log(savedMovieName);
      console.log(savedViewMoviesList);
      if (savedMovieName) {
        handleSearchMovies(savedMovieName.toLowerCase(), checkboxState);
        return;
      }
      if (savedViewMoviesList) {
        setViewMoviesList(savedViewMoviesList);
        return;
      }
      if (movies.length) {
        console.log(movies);
        startMoviesList(movies, findedMovies);
        console.log(findedMovies);
      }
    }
  }, [movies]);

  useEffect(() => {
    console.log(findedMovies.movies)
    if (findedMovies.movies) {
      startMoviesList(movies, findedMovies);
    }
  }, [findedMovies]);

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

  // useEffect(() => {
  //   const savedViewMoviesList = JSON.parse(localStorage.getItem('view-movies'));
  //   console.log(savedViewMoviesList);
  //   if (savedViewMoviesList) {
  //     setViewMoviesList(savedViewMoviesList);
  //   }
  // }, [movies]);

  const startMoviesList = (movies, findedMovies) => {

    //setMoviesList(movies)
    const viewMovies = [];
    const savedMovieName = localStorage.getItem('movie-name');

    if (!movieName && !savedMovieName) {
      if (movies.length <= 12 && movies.length) {
        localStorage.setItem('view-movies', JSON.stringify(movies));
        setViewMoviesList(movies);
        return;
      }
      if (movies.length) {
        for (let i = 0; i <= 11; i++) {
          viewMovies.push(movies[i]);
        }
        setViewMoviesList(viewMovies);
        localStorage.setItem('view-movies', JSON.stringify(viewMovies));
        return;
      }
    }

    if (findedMovies.movies.length <= 12 && findedMovies.movies.length) {
      localStorage.setItem('view-movies', JSON.stringify(findedMovies.movies));
      setViewMoviesList(findedMovies.movies);
      return;
    }

    if (findedMovies.movies.length) {
      console.log('найденные фильмы');
      for (let i = 0; i <= 11; i++) {
        viewMovies.push(findedMovies.movies[i]);
      }
      setViewMoviesList(viewMovies);
      localStorage.setItem(
        'view-movies',
       JSON.stringify(viewMovies),
     );
      return;
    }
    if (!findedMovies.movies.length) {
      console.log('нету!!');
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
  const changeSaveButtonStatus = (movie) => {
    return viewMoviesList.map((m) =>
      m.id === movie.movieId ? { buttonStatusSave: true, ...m } : m,
    );
  };

  // const addInSavedMovies = (movie) => {
  //   handleAddInSavedMovies(movie)
  // }

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
        // console.log(buttonSavedStatus);
        // setPreSavedMovies([]);
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
