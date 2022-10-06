import './Register.css';
import { Link } from 'react-router-dom';
export default function Register() {
  function FormInput(props) {
    return (
      <label className='form-register__label'>
        {props.name}
        <input type={props.type} className='form-register__input' placeholder={props.placeholder}></input>
        <span className='form-register__error'>{props.error}</span>
      </label>
    );
  }
  return (
    <main className='register'>
      <Link to='/' className='register__logo' />
      <h2 className='register__heading'>Добро пожаловать!</h2>
      <form className='form-register'>
        <FormInput name='Имя' type='text' placeholder='Имя' error='невалидное имя.' />
        <FormInput name='E-mail' type='email' placeholder='E-mail' error='невалидная почта.' />
        <FormInput name='Пароль' type='password' placeholder='Пароль' error='невалидный пароль.' />
        <span className='profile__submit-error'></span>
        <button type='submit' className='register__button-save'>Зарегистрироваться</button>
        <p className='register__paragraph'>Уже зарегестрированы?</p>
        <Link to='signin' className='register__link'>Войти</Link>
      </form>
    </main>
  );
}
