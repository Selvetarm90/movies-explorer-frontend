import './Login.css';
import '../Register/Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Login({ handleLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(email, password);
  };

  return (
    <main className='register'>
      <Link to='/' className='register__logo' />
      <h2 className='register__heading'>Рады видеть!</h2>
      <form className='form-register' onSubmit={handleSubmit}>
        <label className='form-register__label'>
          E-mail
          <input
            type='email'
            className='form-register__input'
            placeholder='E-mail'
            value={email}
            onChange={handleChangeEmail}
          ></input>
          <span className='form-register__error'>невалидная почта.</span>
        </label>
        <label className='form-register__label'>
          Пароль
          <input
            type='password'
            className='form-register__input'
            placeholder='Пароль'
            value={password}
            onChange={handleChangePassword}
          ></input>
          <span className='form-register__error'>невалидный пароль.</span>
        </label>
        <span className='profile__submit-error'></span>
        <button type='submit' className='register__button-save'>
          Войти
        </button>
        <p className='register__paragraph register__paragraph_login'>
          Ещё не зарегистрированы?
        </p>
        <Link to='signup' className='register__link'>
          Регистрация
        </Link>
      </form>
    </main>
  );
}
