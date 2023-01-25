import './Register.css';
import { Link } from 'react-router-dom';
import { FormValidation } from '../../utils/FormValidation';
export default function Register({
  handleRegister,
  registerMessage,
  resetRegisterMessage,
}) {
  const { handleChange, values, errors, isValid } =
    FormValidation(resetRegisterMessage);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    handleRegister(values);
  };

  return (
    <main className='register'>
      <Link to='/' className='register__logo' />
      <h2 className='register__heading'>Добро пожаловать!</h2>
      <form className='form-register' noValidate onSubmit={handleSubmit}>
        <label className='form-register__label'>
          Имя
          <input
            type='text'
            className={`form-register__input ${
              errors.name && 'form-register__input_error'
            }`}
            placeholder='Имя'
            name='name'
            required
            minLength='2'
            maxLength='30'
            onChange={handleChange}
            value={values.name}
          ></input>
          <span className='form-register__error'>{errors.name}</span>
        </label>
        <label className='form-register__label'>
          E-mail
          <input
            type='email'
            name='email'
            className={`form-register__input ${
              errors.email && 'form-register__input_error'
            }`}
            placeholder='E-mail'
            onChange={handleChange}
            value={values.email}
          ></input>
          <span className='form-register__error'>{errors.email}</span>
        </label>
        <label className='form-register__label'>
          Пароль
          <input
            type='password'
            name='password'
            required
            minLength='4'
            maxLength='30'
            className={`form-register__input ${
              errors.password && 'form-register__input_error'
            }`}
            placeholder='Пароль'
            onChange={handleChange}
            value={values.password}
          ></input>
          <span className='form-register__error'>{errors.password}</span>
        </label>
        <span className='profile__submit-error'>{registerMessage}</span>
        <button
          type='submit'
          className='register__button-save'
          disabled={!isValid || registerMessage}
        >
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
