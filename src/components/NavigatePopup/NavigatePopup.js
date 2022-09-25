import './NavigatePopup.css';
import { Link, NavLink } from 'react-router-dom';

export default function NavigatePopup() {
  return (
    <div className='popup'>
      <button type='button' className='popup__button-close'/>
      <nav className='popup__navigate'>
        <NavLink className='popup__link' activeClassName='popup__link_active' to='/'>Главная</NavLink>
        <NavLink className='popup__link' activeClassName='popup__link_active' to='movies'>Фильмы</NavLink>
        <NavLink className='popup__link' activeClassName='popup__link_active' to='saved-movies'>Сохраненные фильмы</NavLink>
        <Link className='popup__link popup__link_el_account' to='profile'>Аккаунт</Link>
      </nav>


    </div>
  );
}
