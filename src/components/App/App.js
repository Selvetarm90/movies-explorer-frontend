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
  const history = useHistory();

  useEffect(() => {
    if (loggedIn) {
      const token = localStorage.getItem('jwt');
      setToken(token);
      mainApi
        .getUserInfo(token)
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch((err) => console.log(err));

      mainApi
        .getMovies(token)
        .then((movies) => {
          setSavedMovies(movies);
        })
        .catch((err) => console.log(err));
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
            setEmail(data.email);
            history.push('/');
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    moviesApi
      .getMovies()
      .then((movies) => {
        setMovies(movies);
      })
      .catch((err) => console.log(err));
    if (token) {
      console.log(token);
      // mainApi
      //   .getMovies(token)
      //   .then((movies) => {
      //     setSavedMovies(movies);
      //   })
      //   .catch((err) => console.log(err));
    }
  }, []);

  const handleNavigatePopupOpen = () => setNavigatePopup(true);

  const closeAllPopups = () => setNavigatePopup(false);

  const handleSaveMovie = (data) => {
    console.log(data);
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
            <Movies handleSaveMovie={handleSaveMovie} movies={movies} />
            <Footer />
          </Route>

          <Route path='/saved-movies'>
            <Header
              loggedIn={loggedIn}
              path={'saved-movies'}
              onNavigate={handleNavigatePopupOpen}
            />
            <SavedMovies movies={savedMovies} />
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
