import './App.css';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile';

function App() {
  return (
    <div className='App'>
      <Switch>
        <Route exact path='/'>
          <Header darkBackground={true} loggedIn={true} />
          <Main />
          <Footer />
        </Route>

        <Route path='/movies'>
          <Header darkBackground={false} loggedIn={true} path={'movies'} />
          <Movies />
          <Footer />
        </Route>

        <Route path='/saved-movies'>
          <Header darkBackground={false} loggedIn={true} path={'saved-movies'}/>
          <SavedMovies />
          <Footer />
        </Route>

        <Route path='/profile'>
          <Header darkBackground={false} loggedIn={true} path={'profile'}/>
          <Profile />

        </Route>
        <Route path='/signin'></Route>
        <Route path='/signup'></Route>
      </Switch>
    </div>
  );
}

export default App;
