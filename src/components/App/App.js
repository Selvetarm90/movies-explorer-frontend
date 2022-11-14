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
  const [findedMovies, setFindedMovies] = useState([]);
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
    if (loggedIn) {
      localStorage.removeItem('movie-name');
      localStorage.removeItem('view-movies');
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

  useEffect(() => {
    console.log(savedMovies);
    if (initialCards.length) {
      console.log(initialCards);
      if (!savedMovies.length) {
        setMovies(initialCards);
      } else {
        setMovies(() =>
          initialCards.map((m) => {
            const changingMovies = savedMovies.some(
              (sm) => m.id === sm.movieId,
            );
            if (changingMovies) {
              return { buttonStatusSave: true, ...m };
            } else return m;
          }),
        );
      }
    }
  }, [savedMovies, initialCards]);

  const handleNavigatePopupOpen = () => setNavigatePopup(true);

  const closeAllPopups = () => setNavigatePopup(false);

  // const changeSaveButtonStatus = (movie) => {
  //   return movies.map((m) =>
  //     m.id === movie.movieId ? { buttonStatusSave: true, ...m } : m,
  //   );
  // };

  // const handleSaveMovie = (data) => {
  //   mainApi
  //     .addMovie(data, token)
  //     .then((movie) => {
  //       console.log(movie)
  //       //setButtonSavedStatus(buttonSavedStatus.concat(movie.movieId));
  //       //Нужно сохранить в сторэйдж фильмы после сохранения фильма!!
  //       // localStorage.setItem(
  //       //   'view-movies',
  //       //   JSON.stringify(changeSaveButtonStatus(movie)),
  //       // );
  //       // console.log(JSON.parse(localStorage.getItem('view-movies')));
  //       return movie

  //       setMovies(() => changeSaveButtonStatus(movie));
  //       // console.log(buttonSavedStatus);
  //       setPreSavedMovies([]);
  //     })
  //     .catch((err) => console.log(err));
  // };

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

  const handleSearchMovies = (text, checkboxState) => {
    setFindedMovies([]);
    if (checkboxState) {
      setFindedMovies(findedMovies.filter((item) => item.duration < 40));
    } else {
      setFindedMovies(
        movies.filter((item) => item.nameRU.toLowerCase().includes(text)),
      );
    }
  };

  const handleDeleteButtonStatusLocal = (movieId) => {
    const viewMovies = JSON.parse(localStorage.getItem('view-movies'));
    console.log(viewMovies);
    return viewMovies.map((m) => {
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
        console.log(JSON.parse(localStorage.getItem('view-movies')));
        setMovies(() => handleDeleteButtonStatus(movieId));

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
              addInSavedMovies={addInSavedMovies}
              movies={movies}
              findedMovies={findedMovies}
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
