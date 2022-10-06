import { useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [isReductOpen, setReductOpen] = useState(false);
  const [name, setName] = useState('Андрей Воробей');
  const [email, setEmail] = useState('andrey@ya.ru');
  const [errorReduct, setErrorReduct] = useState('')

  const handleReduct = () => {
    setReductOpen(!isReductOpen);
  };

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const handleErrorReduct = () => {
    setErrorReduct('Ошибка!')
  }

  return (
    <main className='profile'>
      <h2 className='profile__heading'>Привет, Андрей!</h2>
      <form className='form'>
        <label className='form__label'>
          <span className='form__placeholder'>Имя</span>
          <input
            type='text'
            className='form__input'
            value={name}
            onChange={handleChangeName}
            disabled={!isReductOpen}
          />
        </label>

        <label className='form__label'>
          <span className='form__placeholder'>E-mail</span>
          <input
            type='email'
            className='form__input'
            value={email}
            onChange={handleChangeEmail}
            disabled={!isReductOpen}
          />
        </label>
      </form>
      <button
        type='button'
        className={`profile__button ${
          isReductOpen ? 'profile__button_none' : ''
        }`}
        onClick={handleReduct}
      >
        Редактировать
      </button>
      <button
        type='button'
        className={`profile__button profile__button_logout ${
          isReductOpen ? 'profile__button_none' : ''
        }`}
      >
        Выйти из аккаунта
      </button>
      <span
        className={`profile__error ${
          !errorReduct ? 'profile__error_none' : ''
        }`}
      >
        {errorReduct}
      </span>
      <button
        type='submit'
        onClick={handleErrorReduct}
        className={`profile__button profile__button-save ${
          !isReductOpen ? 'profile__button_none' : ''
        } ${errorReduct ? 'profile__button-save_unactive' : ''}`}
      >
        Сохранить
      </button>
    </main>
  );
}
