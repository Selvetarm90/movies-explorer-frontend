import { Link, NavLink } from 'react-router-dom';
import './Navigation.css';

export default function Navigation(props) {
  if (props.header === 'no-authorized-header') {
    return (
      <nav className='navigation'>
        <Link
          className='navigation__link navigation__link_el_signup'
          to='signup'
        >
          Регистрация
        </Link>
        <Link
          className='navigation__link navigation__link_el_signin'
          to='signin'
        >
          Войти
        </Link>
      </nav>
    );
  }
  if (props.header === 'authorized-header') {
    return (
      <nav className='navigation'>
        <NavLink
          className='navigation__link navigation__link_el_movies navigation__link_unactive navigation__link_theme_white link_hiden'
          activeClassName='navigation__link_active'
          to='movies'
        >
          Фильмы
        </NavLink>
        <NavLink
          className='navigation__link navigation__link_el_saved-movies navigation__link_unactive navigation__link_theme_white link_hiden'
          activeClassName='navigation__link_active'
          to='saved-movies'
        >
          Сохраненные фильмы
        </NavLink>
        <NavLink
          className='navigation__link navigation__link_el_profile navigation__link_theme_white navigation__link_profile_white link_hiden'
          activeClassName='navigation__link_active'
          to='profile'
        >
          Аккаунт
        </NavLink>
        <button type='button' className='navigation__burger navigation__burger_color_white'></button>
      </nav>
    );
  }
  if (props.header === 'white-authorized-header') {
    return (
      <nav className='navigation navigation_hiden'>
        <NavLink
          className='navigation__link navigation__link_el_movies link_hiden'
          activeClassName='navigation__link_active'
          to='movies'
        >
          Фильмы
        </NavLink>
        <NavLink
          className='navigation__link navigation__link_el_saved-movies link_hiden'
          activeClassName='navigation__link_active'
          to='saved-movies'
        >
          Сохраненные фильмы
        </NavLink>
        <NavLink
          className='navigation__link navigation__link_el_profile link_hiden'
          activeClassName='navigation__link_active'
          to='profile'
        >
          Аккаунт
        </NavLink>
        <button type='button' className='navigation__burger'></button>
      </nav>
    );
  }
}
