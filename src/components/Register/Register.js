import './Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
export default function Register({ handleRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(name, email, password);
  };

  return (
    <main className='register'>
      <Link to='/' className='register__logo' />
      <h2 className='register__heading'>Добро пожаловать!</h2>
      <form className='form-register' onSubmit={handleSubmit}>
        <label className='form-register__label'>
          Имя
          <input
            type='text'
            className='form-register__input'
            placeholder='Имя'
            onChange={handleChangeName}
            value={name}
          ></input>
          <span className='form-register__error'>невалидное имя.</span>
        </label>
        <label className='form-register__label'>
          E-mail
          <input
            type='email'
            className='form-register__input'
            placeholder='E-mail'
            onChange={handleChangeEmail}
            value={email}
          ></input>
          <span className='form-register__error'>невалидная почта.</span>
        </label>
        <label className='form-register__label'>
          Пароль
          <input
            type='password'
            className='form-register__input'
            placeholder='Пароль'
            onChange={handleChangePassword}
            value={password}
          ></input>
          <span className='form-register__error'>невалидный пароль.</span>
        </label>
        <span className='profile__submit-error'></span>
        <button type='submit' className='register__button-save'>
          Зарегистрироваться
        </button>
        <p className='register__paragraph'>Уже зарегестрированы?</p>
        <Link to='signin' className='register__link'>
          Войти
        </Link>
      </form>
    </main>
  );
}
