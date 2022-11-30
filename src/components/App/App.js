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
import { ProtectedRoute } from '../ProtectedRoure/ProtectedRoute';
import Popup from '../Popup/Popup';

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
  const [token, setToken] = useState('');
  const history = useHistory();
  const [width, setWidth] = useState(window.innerWidth);
  const [moviesListLength, setMoviesListLength] = useState(12);
  const [addMoviesLength, setAddMoviesLength] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [isReductOpen, setReductOpen] = useState(false);
  const [registerMessage, setRegisterMessage] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  useEffect(() => {
    setIsLoading(true);
    moviesApi
      .getMovies()
      .then((movies) => {
        setInitialCards(movies);
        setMessage('');
      })
      .catch(() => {
        setMessage(
          'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз.',
        );
      })
      .finally(() => setTimeout(() => setIsLoading(false), 800));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', changeWidthWindow);
    return () => window.removeEventListener('resize', changeWidthWindow);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('jwt');
    if (token) {
      auth
        .checkToken(token)
        .then((data) => {
          if (data) {
            setLoggedIn(true);
          }
        })
        .catch((err) => {
          setPopupMessage(
            'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
          );
          console.log(err);
        });
    }
  }, []);

  useEffect(() => {
    if (width > 1160) {
      setAddMoviesLength(3);
      setMoviesListLength(12);
    } else if (width <= 1160 && width >= 731) {
      setAddMoviesLength(2);
      setMoviesListLength(8);
    } else if (width < 731) {
      setAddMoviesLength(2);
      setMoviesListLength(5);
    }
  }, [width]);

  useEffect(() => {
    if (initialCards.length) {
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
        })
        .catch((err) => {
          setPopupMessage(
            'При авторизации произошла ошибка. Токен не передан или передан не в том формате',
          );
          console.log(err);
        });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (currentUser._id) {
      const token = localStorage.getItem('jwt');
      mainApi
        .getMovies(token)
        .then((movies) => {
          const mySavedMovies = movies.filter(
            (movie) => movie.owner.toString() === currentUser._id.toString(),
          );
          setSavedMovies(mySavedMovies);
          setMessage('');
        })
        .catch((err) => {
          setMessage('Что-то пошло не так.');
          console.log(err);
        });
    }
  }, [currentUser]);

  const changeWidthWindow = () => {
    setTimeout(() => setWidth(window.innerWidth), 1200);
  };

  const handleNavigatePopupOpen = () => setNavigatePopup(true);
  const closeAllPopups = () => setNavigatePopup(false);
  const addInSavedMovies = (movie) => {
    mainApi
      .getMovies(token)
      .then((movies) => {
        const mySavedMovies = movies.filter(
          (movie) => movie.owner.toString() === currentUser._id.toString(),
        );
        setSavedMovies(mySavedMovies);
        setMessage('');
      })
      .catch((err) => {
        setMessage('Что-то пошло не так.');
        console.log(err);
      });
  };

  const filterMovies = () => {
    const savedFindedMovies = JSON.parse(localStorage.getItem('finded-movies'));
    if (savedFindedMovies?.movies || savedFindedMovies) {
      const movieList = savedFindedMovies.movies
        ? savedFindedMovies.movies
        : savedFindedMovies;
      setFindedMovies({
        filterMovies: movieList.filter((item) => item.duration <= 40),
      });
      localStorage.setItem(
        'finded-movies',
        JSON.stringify({
          filterMovies: movieList.filter((item) => item.duration <= 40),
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
    setIsLoading(true);
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
    setFindedMovies(moviesList);
    localStorage.setItem('finded-movies', JSON.stringify(moviesList));
    setTimeout(() => setIsLoading(false), 400);
  };

  const handleDeleteButtonStatusLocal = (movieId, moviesList) => {
    if (!moviesList) {
      moviesList = JSON.parse(localStorage.getItem('view-movies'));
    }
    return moviesList.map((m) => {
      if (m.id === movieId) {
        delete m.buttonStatusSave;
      }
      return m;
    });
  };

  const handleDeleteButtonStatus = (movieId, movieList = movies) => {
    return movieList.map((m) => {
      if (m.id === movieId) {
        delete m.buttonStatusSave;
      }
      return m;
    });
  };

  const handleDeleteMovie = (id, movieId) => {
    const savedFindedMovies = JSON.parse(localStorage.getItem('finded-movies'));
    if (id === '') {
      id = savedMovies.find((m) => m.movieId === movieId)._id;
    }
    mainApi
      .delMovie(id, token)
      .then((movie) => {
        mainApi.getMovies(token).then((movies) => {
          const mySavedMovies = movies.filter(
            (movie) => movie.owner.toString() === currentUser._id.toString(),
          );
          setSavedMovies(mySavedMovies);
        });

        localStorage.setItem(
          'view-movies',
          JSON.stringify(handleDeleteButtonStatusLocal(movieId)),
        );
        if (
          findedMovies?.filtermovies ||
          findedMovies?.movies ||
          savedFindedMovies?.movies ||
          savedFindedMovies?.filterMovies ||
          savedFindedMovies.length
        ) {
          localStorage.setItem(
            'finded-movies',
            JSON.stringify(
              handleDeleteButtonStatusLocal(
                movieId,
                findedMovies?.filterMovies ||
                  findedMovies?.movies ||
                  savedFindedMovies?.filterMovies ||
                  savedFindedMovies?.movies ||
                  savedFindedMovies,
              ),
            ),
          );
        }
        setMovies(() => handleDeleteButtonStatus(movieId));

        if (
          findedMovies.filterMovies ||
          findedMovies.movies ||
          savedFindedMovies.filterMovies ||
          savedFindedMovies.movies
        ) {
          const moviesList = findedMovies.filterMovies
            ? findedMovies.filterMovies
            : findedMovies.movies
            ? findedMovies.movies
            : savedFindedMovies.filterMovies
            ? savedFindedMovies.filterMovies
            : savedFindedMovies.movies;

          setFindedMovies(() => handleDeleteButtonStatus(movieId, moviesList));
        }
        setMessage('');
      })
      .catch((err) => {
        setMessage('Что-то пошло не так.');
        console.log(err);
      });
  };

  const handleRegister = (data) => {
    const { name, email, password } = data;
    auth
      .register(name, email, password)
      .then((data) => {
        if (data) {
          const message = 'Вы успешно зарегистрировались.';
          handleLogin({ email, password }, message);
          // setPopupMessage('Вы успешно зарегистрировались.');
          // history.push('/signin');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === 409) {
          setRegisterMessage('Пользователь с таким email уже существует.');
        } else
          setRegisterMessage('При регистрации пользователя произошла ошибка.');
      });
  };

  const handleLogin = (data, message = 'Вы успешно авторизовались.') => {
    const { email, password } = data;
    auth
      .login(email, password)
      .then((data) => {
        if (data) {
          localStorage.setItem('jwt', data.token);
          setToken(data.token);
          setLoggedIn(true);
          setPopupMessage(message);
          history.push('/movies');
        }
      })
      .catch((err) => {
        console.log(err);
        if (err === 401) {
          setLoginMessage('Вы ввели неправильный логин или пароль.');
        } else setLoginMessage('При авторизации произошла ошибка');
      });
  };

  const updateProfile = (data) => {
    mainApi
      .updateUserInfo(token, data)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        setPopupMessage('Профиль изменён успешно.');
        setProfileMessage('');
        handleReductOpen();
      })
      .catch((err) => {
        if (err === 409) {
          setProfileMessage('Пользователь с таким email уже существует.');
        } else setProfileMessage('При обновлении профиля произошла ошибка.');
      });
  };

  const handleReductOpen = () => {
    setReductOpen(!isReductOpen);
  };

  const resetProfileMessage = () => {
    setProfileMessage('');
  };

  const resetRegisterMessage = () => {
    setRegisterMessage('');
  };

  const resetLoginMessage = () => {
    setLoginMessage('');
  };

  const handleSetMessage = (val) => {
    setMessage(val);
  };

  const handlePopupClick = () => {
    setPopupMessage('');
  };

  const handleLogout = () => {
    localStorage.clear();
    setToken('');
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
            <ProtectedRoute
              path='/movies'
              component={Movies}
              handleSearchMovies={handleSearchMovies}
              handleDeleteMovie={handleDeleteMovie}
              addInSavedMovies={addInSavedMovies}
              movies={movies}
              findedMovies={findedMovies}
              filterMovies={filterMovies}
              moviesListLength={moviesListLength}
              addMoviesLength={addMoviesLength}
              isLoading={isLoading}
              message={message}
              handleSetMessage={handleSetMessage}
            />
            <Footer />
          </Route>

          <Route path='/saved-movies'>
            <Header
              loggedIn={loggedIn}
              path={'saved-movies'}
              onNavigate={handleNavigatePopupOpen}
            />
            <ProtectedRoute
              component={SavedMovies}
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
            <ProtectedRoute
              component={Profile}
              handleLogout={handleLogout}
              updateProfile={updateProfile}
              profileMessage={profileMessage}
              resetProfileMessage={resetProfileMessage}
              isReductOpen={isReductOpen}
              handleReductOpen={handleReductOpen}
            />
          </Route>

          <Route path='/signin'>
            <Login
              handleLogin={handleLogin}
              resetLoginMessage={resetLoginMessage}
              loginMessage={loginMessage}
            />
          </Route>

          <Route path='/signup'>
            <Register
              handleRegister={handleRegister}
              registerMessage={registerMessage}
              resetRegisterMessage={resetRegisterMessage}
            />
          </Route>

          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
        <Popup message={popupMessage} onClick={handlePopupClick} />

        <NavigatePopup isOpen={isNavigatePopupOpen} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
