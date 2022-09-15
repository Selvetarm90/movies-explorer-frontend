import './Header.css';
import { Link, Route, Switch } from 'react-router-dom';

export default function Header(props) {
  function NoAuthorizedHeader() {
    return (
      <>
        <Link className='header__link header__link_el_signup' to='signup'>
          Регистрация
        </Link>
        <Link className='header__link header__link_el_signin' to='signin'>
          Войти
        </Link>
      </>
    );
  }

  function AuthorizedHeader() {
    return (
      <>
        <Link
          className='header__link header__link_el_movies header__link_unactive header__link_theme_white'
          to='movies'
        >
          Фильмы
        </Link>
        <Link
          className='header__link header__link_el_saved-movies header__link_unactive header__link_theme_white'
          to='saved-movies'
        >
          Сохраненные фильмы
        </Link>
        <Link
          className='header__link header__link_el_profile header__link_theme_white header__link_profile_white header__link_active'
          to='profile'
        >
          Аккаунт
        </Link>
      </>
    );
  }

  function WhiteAuthorizedHeader() {
    return (
      <>
        <Link
          className={`header__link header__link_el_movies ${
            props.path === 'movies' ? 'header__link_active' : ''
          }`}
          to='movies'
        >
          Фильмы
        </Link>
        <Link
          className={`header__link header__link_el_saved-movies ${
            props.path === 'saved-movies' ? 'header__link_active' : ''
          }`}
          to='saved-movies'
        >
          Сохраненные фильмы
        </Link>
        <Link className={`header__link header__link_el_profile ${
            props.path === 'profile' ? 'header__link_active' : ''
          }`} to='profile'>
          Аккаунт
        </Link>
      </>
    );
  }

  function Header() {
    if (props.loggedIn) {
      if (props.path) {
        return <WhiteAuthorizedHeader />;
      }
      return <AuthorizedHeader />;
    }
    return <NoAuthorizedHeader />;
  }

  return (
    <header className={`header ${props.darkBackground ? 'header_dark' : ''}`}>
      <Link className='header__logo' to='/' />
      <Switch>
        <Route exact path='/'>
          <Header />
        </Route>

        <Route path={`/${props.path}`}>
          <Header />
        </Route>
      </Switch>
    </header>
  );
}
