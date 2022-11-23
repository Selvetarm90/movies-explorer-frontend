import './App.css';
import { Route, Switch, useHistory } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import Login from '../Login/Login';
import NotFound from '../NotFound/NotFound';
import NavigatePopup from '../NavigatePopup/NavigatePopup';
import { useEffect, useState } from 'react';
import * as moviesApi from '../../utils/MoviesApi';
import * as mainApi from '../../utils/MainApi';
import * as auth from '../../utils/auth';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [isNavigatePopupOpen, setNavigatePopup] = useState(false);
  const [initialCards, setInitialCards] = useState([]);
  const [movies, setMovies] = useState([]);
  const savedFindedMovies = JSON.parse(localStorage.getItem('finded-movies'));

  const [findedMovies, setFindedMovies] = useState(
    savedFindedMovies ? savedFindedMovies : [],
  );
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  // const [buttonSavedStatus, setButtonSavedStatus] = useState([]);
  const [preSavedMovies, setPreSavedMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    // localStorage.removeItem('movie-name');
    // localStorage.removeItem('view-movies');
    // localStorage.removeItem('checkbox');
    moviesApi
      .getMovies()
      .then((movies) => {
        setInitialCards(movies);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setEmail(data.email);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    console.log(savedMovies);
    if (initialCards.length) {
      console.log(initialCards);
      console.log(savedMovies);
      if (!savedMovies.length) {
        setMovies(initialCards);
        return;
      }
      if (savedMovies.length && initialCards.length) {
        const changeSaveButtonStatus = () =>
          initialCards.map((m) => {
            const changingMovies = savedMovies.some(
              (sm) => m.id === sm.movieId,
            );
            if (changingMovies) {
              return { buttonStatusSave: true, ...m };
            } else return m;
          });
        setMovies(changeSaveButtonStatus);
      }
    }
  }, [savedMovies, initialCards]);

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      setToken(token);
      auth
        .checkToken(token)
        .then((userInfo) => {
          setCurrentUser(userInfo);
          //setMovies(initialCards);
          console.log(userInfo);
        })
        .catch((err) => console.log(err));
    } else {
    }
  }, [loggedIn]);

  useEffect(() => {
    if (currentUser._id) {
      const token = localStorage.getItem('jwt');
      mainApi
        .getMovies(token)
        .then((movies) => {
          console.log(movies);
          const mySavedMovies = movies.filter(
            (movie) => movie.owner.toString() === currentUser._id.toString(),
          );
          setSavedMovies(mySavedMovies);
        })
        .catch((err) => console.log(err));
    }
  }, [currentUser]);

  const handleNavigatePopupOpen = () => setNavigatePopup(true);

  const closeAllPopups = () => setNavigatePopup(false);

  const addInSavedMovies = (movie) => {
    mainApi
      .getMovies(token)
      .then((movies) => {
        console.log(movies);
        const mySavedMovies = movies.filter(
          (movie) => movie.owner.toString() === currentUser._id.toString(),
        );
        setSavedMovies(mySavedMovies);
      })
      .catch((err) => console.log(err));
  };

  const filterMovies = () => {
    console.log(savedFindedMovies);
    if (savedFindedMovies?.movies || savedFindedMovies) {
      const movieList = savedFindedMovies.movies
        ? savedFindedMovies.movies
        : savedFindedMovies;
      setFindedMovies({
        filterMovies: movieList.filter(
          (item) => item.duration <= 40,
        ),
      });
      localStorage.setItem(
        'finded-movies',
        JSON.stringify({
          filterMovies: movieList.filter(
            (item) => item.duration <= 40,
          ),
        }),
      );
      return;
    }
    if (findedMovies?.movies) {
      setFindedMovies({
        filterMovies: findedMovies.movies.filter((item) => item.duration <= 40),
      });
      localStorage.setItem(
        'finded-movies',
        JSON.stringify({
          filterMovies: findedMovies.movies.filter(
            (item) => item.duration <= 40,
          ),
        }),
      );
      return;
    }
    if (!findedMovies?.movies) {
      setFindedMovies({
        filterMovies: movies.filter((item) => item.duration <= 40),
      });
      localStorage.setItem(
        'finded-movies',
        JSON.stringify({
          filterMovies: movies.filter((item) => item.duration <= 40),
        }),
      );
    }
  };

  const handleSearchMovies = (text, checkboxState) => {
    console.log(findedMovies);
    console.log(movies);

    localStorage.removeItem('view-movies');
    const moviesList = checkboxState
      ? {
          filterMovies: movies.filter(
            (item) =>
              item.nameRU.toLowerCase().includes(text) && item.duration < 40,
          ),
          movies: movies.filter((item) =>
            item.nameRU.toLowerCase().includes(text),
          ),
        }
      : {
          movies: movies.filter((item) =>
            item.nameRU.toLowerCase().includes(text),
          ),
        };
    console.log(moviesList);

    setFindedMovies(moviesList);
    localStorage.setItem('finded-movies', JSON.stringify(moviesList));
  };

  const handleDeleteButtonStatusLocal = (
    movieId,
    moviesList = JSON.parse(localStorage.getItem('view-movies')),
  ) => {
    const savedViewMovies = JSON.parse(localStorage.getItem('view-movies'));
    console.log(moviesList);
    return moviesList.map((m) => {
      if (m.id === movieId) {
        delete m.buttonStatusSave;
      }
      return m;
    });
  };

  const handleDeleteButtonStatus = (movieId) => {
    return movies.map((m) => {
      if (m.id === movieId) {
        delete m.buttonStatusSave;
      }
      return m;
    });
  };

  const handleDeleteMovie = (id, movieId) => {
    if (id === '') {
      id = savedMovies.find(m => m.movieId === movieId)._id
    }
    mainApi
      .delMovie(id, token)
      .then((movie) => {
        mainApi
          .getMovies(token)
          .then((movies) => {
            console.log(movies);
            const mySavedMovies = movies.filter(
              (movie) => movie.owner.toString() === currentUser._id.toString(),
            );
            setSavedMovies(mySavedMovies);
          })
          .catch((err) => console.log(err));
        localStorage.setItem(
          'view-movies',
          JSON.stringify(handleDeleteButtonStatusLocal(movieId)),
        );
        localStorage.setItem(
          'finded-movies',
          JSON.stringify(
            handleDeleteButtonStatusLocal(
              movieId,
              findedMovies.filterMovies || findedMovies.movies,
            ),
          ),
        );
        console.log(JSON.parse(localStorage.getItem('view-movies')));
        setMovies(() => handleDeleteButtonStatus(movieId));

        console.log(movie);
        // setPreSavedMovies([]);
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        if (data) {
          setErrorMessage('');

          history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('Что-то пошло не так! Попробуйте ещё раз.');
      });
  };

  const handleLogin = (email, password) => {
    auth
      .login(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.token);
          setToken(data.token);
          setEmail(email);
          setLoggedIn(true);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage('Что-то пошло не так! Попробуйте ещё раз.');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem('jwt');
    localStorage.removeItem('movie-name');
    localStorage.removeItem('finded-movies');
    localStorage.removeItem('view-movies');
    setToken('');
    setEmail('');
    setLoggedIn(false);
    history.push('/');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='App'>
        <Switch>
          <Route exact path='/'>
            <Header
              darkBackground={true}
              loggedIn={loggedIn}
              path={''}
              onNavigate={handleNavigatePopupOpen}
            />
            <Main />
            <Footer />
          </Route>

          <Route path='/movies'>
            <Header
              loggedIn={loggedIn}
              path={'movies'}
              onNavigate={handleNavigatePopupOpen}
            />
            <Movies
              handleSearchMovies={handleSearchMovies}
              handleDeleteMovie={handleDeleteMovie}
              addInSavedMovies={addInSavedMovies}
              movies={movies}
              findedMovies={findedMovies}
              filterMovies={filterMovies}

              // buttonSavedStatus={buttonSavedStatus}
            />
            <Footer />
          </Route>

          <Route path='/saved-movies'>
            <Header
              loggedIn={loggedIn}
              path={'saved-movies'}
              onNavigate={handleNavigatePopupOpen}
            />
            <SavedMovies
              movies={savedMovies}
              handleDeleteMovie={handleDeleteMovie}
            />
            <Footer />
          </Route>

          <Route path='/profile'>
            <Header
              loggedIn={loggedIn}
              path={'profile'}
              onNavigate={handleNavigatePopupOpen}
            />
            <Profile handleLogout={handleLogout} />
          </Route>

          <Route path='/signin'>
            <Login handleLogin={handleLogin} />
          </Route>

          <Route path='/signup'>
            <Register handleRegister={handleRegister} />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>

        <NavigatePopup isOpen={isNavigatePopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
