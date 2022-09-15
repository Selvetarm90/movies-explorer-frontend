import { useState } from 'react';
import './Profile.css';

export default function Profile() {
  const [isReductOpen, setReductOpen] = useState(false);
  const [name, setName] = useState('Андрей Воробей');
  const [email, setEmail] = useState('andrey@ya.ru');

  const handleReduct = () => {
    setReductOpen(!isReductOpen);
  };

  const handleChangeName = (evt) => {
    setName(evt.target.value);
  };

  const handleChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

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
      <button type='button' className='profile__button' onClick={handleReduct}>
        Редактировать
      </button>
      <button type='button' className='profile__button profile__button_red'>
        Выйти из аккаунта
      </button>
    </main>
  );
}
