import './NavigatePopup.css';
import { Link, NavLink } from 'react-router-dom';

export default function NavigatePopup(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <button
        type='button'
        className='popup__button-close'
        onClick={props.onClose}
      />
      <nav className='popup__navigate'>
        <NavLink
          className='popup__link'
          activeClassName='popup__link_active'
          exact
          to='/'
          onClick={props.onClose}
        >
          Главная
        </NavLink>
        <NavLink
          className='popup__link'
          activeClassName='popup__link_active'
          to='movies'
          onClick={props.onClose}
        >
          Фильмы
        </NavLink>
        <NavLink
          className='popup__link'
          activeClassName='popup__link_active'
          to='saved-movies'
          onClick={props.onClose}
        >
          Сохраненные фильмы
        </NavLink>
        <Link
          className='popup__link popup__link_el_account'
          to='profile'
          onClick={props.onClose}
        >
          Аккаунт
        </Link>
      </nav>
    </div>
  );
}
