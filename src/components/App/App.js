import './App.css';
import { Route, Switch } from 'react-router-dom';
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
import { useState } from 'react';

function App() {
  const [isNavigatePopupOpen, setNavigatePopup] = useState(false);

  const handleNavigatePopupOpen = () => setNavigatePopup(true);

  const closeAllPopups = () => setNavigatePopup(false);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Header
            darkBackground={true}
            loggedIn={true}
            path={''}
            onNavigate={handleNavigatePopupOpen}
          />
          <Main />
          <Footer />
        </Route>

        <Route path='/movies'>
          <Header
            loggedIn={true}
            path={'movies'}
            onNavigate={handleNavigatePopupOpen}
          />
          <Movies />
          <Footer />
        </Route>

        <Route path='/saved-movies'>
          <Header
            loggedIn={true}
            path={'saved-movies'}
            onNavigate={handleNavigatePopupOpen}
          />
          <SavedMovies />
          <Footer />
        </Route>

        <Route path='/profile'>
          <Header
            loggedIn={true}
            path={'profile'}
            onNavigate={handleNavigatePopupOpen}
          />
          <Profile />
        </Route>

        <Route path='/signin'>
          <Login />
        </Route>

        <Route path='/signup'>
          <Register />
        </Route>

        <Route path='*'>
          <NotFound />
        </Route>
      </Switch>

      <NavigatePopup isOpen={isNavigatePopupOpen} onClose={closeAllPopups} />
    </div>
  );
}

export default App;
