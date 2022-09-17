import './Login.css';
import '../Register/Register.css';
import { Link } from 'react-router-dom';

export default function Login () {
  function FormInput(props) {
    return (
      <label className='form-register__label'>
        {props.name}
        <input type={props.type} className='form-register__input'></input>
        <span className='form-register__error'>{props.error}</span>
      </label>
    );
  }
  return(
    <main className='register'>
      <Link to='/' className='register__logo' />
      <h2 className='register__heading'>Рады видеть!</h2>
      <form className='form-register'>
        <FormInput name='E-mail' type='email' error='невалидная почта.' />
        <FormInput name='Пароль' type='password' error='невалидный пароль.' />
        <span className='profile__submit-error'></span>
        <button type='submit' className='register__button-save'>Войти</button>
        <p className='register__paragraph register__paragraph_login'>Ещё не зарегистрированы?</p>
        <Link to='signup' className='register__link'>Регистрация</Link>
      </form>

    </main>
  )
}
