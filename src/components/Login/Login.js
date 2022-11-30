import './Login.css';
import '../Register/Register.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FormValidation } from '../../utils/FormValidation';

export default function Login({
  handleLogin,
  loginMessage,
  resetLoginMessage,
}) {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  const { handleChange, values, errors, isValid } =
    FormValidation(resetLoginMessage);

  // const handleChangeEmail = (evt) => {
  //   setEmail(evt.target.value);
  // };

  // const handleChangePassword = (evt) => {
  //   setPassword(evt.target.value);
  // };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleLogin(values);
  };

  return (
    <main className='register'>
      <Link to='/' className='register__logo' />
      <h2 className='register__heading'>Рады видеть!</h2>
      <form className='form-register' noValidate onSubmit={handleSubmit}>
        <label className='form-register__label'>
          E-mail
          <input
            type='email'
            className={`form-register__input${
              errors.email && ' form-register__input_error'
            }`}
            placeholder='E-mail'
            name='email'
            value={values.email}
            onChange={handleChange}
          ></input>
          <span className='form-register__error'>{errors.email}</span>
        </label>
        <label className='form-register__label'>
          Пароль
          <input
            type='password'
            className={`form-register__input${
              errors.password && ' form-register__input_error'
            }`}
            placeholder='Пароль'
            name='password'
            required
            minLength='4'
            maxLength='30'
            value={values.password}
            onChange={handleChange}
          ></input>
          <span className='form-register__error'>{errors.password}</span>
        </label>
        <span className='profile__submit-error'>{loginMessage}</span>
        <button
          type='submit'
          className='register__button-save'
          disabled={!isValid || loginMessage}
        >
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
