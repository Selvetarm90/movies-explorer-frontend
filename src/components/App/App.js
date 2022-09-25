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

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Header darkBackground={true} loggedIn={true} path={''} />
          <Main />
          <Footer />
        </Route>

        <Route path='/movies'>
          <Header  loggedIn={true} path={'movies'} />
          <Movies />
          <Footer />
        </Route>

        <Route path='/saved-movies'>
          <Header  loggedIn={true} path={'saved-movies'}/>
          <SavedMovies />
          <Footer />
        </Route>

        <Route path='/profile'>
          <Header  loggedIn={true} path={'profile'}/>
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
    </div>
  );
}

export default App;
