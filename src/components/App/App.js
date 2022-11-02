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
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [buttonSavedStatus, setButtonSavedStatus] = useState([]);
  const [preSavedMovies, setPreSavedMovies] = useState([]);
  const history = useHistory();

  useEffect(() => {
    moviesApi
      .getMovies()
      .then((movies) => {
        setMovies(movies);
        console.log(movies);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (loggedIn) {
      console.log(currentUser);
      const token = localStorage.getItem('jwt');
      setToken(token);
      auth
        .checkToken(token)
        .then((userInfo) => {
          setCurrentUser(userInfo);
          setMovies(movies);
          console.log(userInfo);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    setMovies(movies);
    console.log(currentUser);
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
    setMovies(movies);
    console.log(currentUser);
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
  }, [currentUser, preSavedMovies]);

  useEffect(() => {
    console.log(movies)
    console.log(savedMovies)
    setMovies((movies) =>
            movies.map((m) => {
              const changingMovies = savedMovies.some(
                (sm) => m.id === sm.movieId,
              );
              if (changingMovies) {
                return { buttonStatusSave: true, ...m };
              } else return m;
            }),
          );
  }, [savedMovies]);

  const handleNavigatePopupOpen = () => setNavigatePopup(true);

  const closeAllPopups = () => setNavigatePopup(false);

  const handleSaveMovie = (data) => {
    mainApi
      .addMovie(data, token)
      .then((movie) => {
        //setButtonSavedStatus(buttonSavedStatus.concat(movie.movieId));
        setMovies((movies) =>
          movies.map((m) =>
            m.id === data.movieId ? { buttonStatusSave: true, ...m } : m,
          ),
        );
        console.log(buttonSavedStatus);
        setPreSavedMovies([]);
        console.log(preSavedMovies);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (id, movieId) => {
    console.log(movieId);
    mainApi
      .delMovie(id, token)
      .then((movie) => {
        console.log(movie.data.movieId);
        setMovies((movies) =>
          movies.map((m) => {
            if (m.id === movieId) {
              delete m.buttonStatusSave;
            }
            return m;
          }),
        );

        console.log(movie);
        setPreSavedMovies([]);
      })
      .catch((err) => console.log(err));
  };

  const handleRegister = (name, email, password) => {
    auth
      .register(name, email, password)
      .then((data) => {
        if (data) {
          setErrorMessage('');
          console.log(data);
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
              handleSaveMovie={handleSaveMovie}
              movies={movies}
              buttonSavedStatus={buttonSavedStatus}
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
