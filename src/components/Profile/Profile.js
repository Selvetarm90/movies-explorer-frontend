import { useContext, useEffect } from 'react';
import { FormValidation } from '../../utils/FormValidation';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import './Profile.css';

export default function Profile({
  handleLogout,
  updateProfile,
  profileMessage,
  resetProfileMessage,
  isReductOpen,
  handleReductOpen,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { handleChange, values, errors, isValid, resetInputs } =
    FormValidation(resetProfileMessage);

  useEffect(() => {
    if (currentUser.name) {
      const { name, email } = currentUser;
      resetInputs(true, { name, email }, {});
    }
  }, [currentUser, resetInputs]);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    updateProfile(values);
  };

  const handleClickLogout = () => {
    handleLogout();
  };

  const checkFormValid =
    !isValid ||
    (currentUser.email === values.email && currentUser.name === values.name) ||
    profileMessage;

  return (
    <main className='profile'>
      <h2 className='profile__heading'>{`Привет, ${
        currentUser.name || ''
      }!`}</h2>
      <form className='form' onSubmit={handleSubmit}>
        <label className='form__label'>
          <span className='form__placeholder'>Имя</span>
          <input
            type='text'
            name='name'
            minLength='2'
            maxLength='30'
            required
            placeholder='Имя'
            className={`form__input ${errors.name ? 'form__input_error' : ''}`}
            value={values.name}
            onChange={handleChange}
            disabled={!isReductOpen}
          />
        </label>

        <label className='form__label'>
          <span className='form__placeholder'>E-mail</span>
          <input
            type='email'
            name='email'
            className={`form__input ${errors.email ? 'form__input_error' : ''}`}
            value={values.email}
            onChange={handleChange}
            disabled={!isReductOpen}
            placeholder='Почта'
          />
        </label>
        <span
          className={`profile__error ${!isReductOpen && 'profile__error_none'}`}
        >
          {errors.name || errors.email || profileMessage || ''}
        </span>
        <button
          type='submit'
          disabled={checkFormValid}
          className={`profile__button profile__button-save ${
            !isReductOpen ? 'profile__button_none' : ''
          } }`}
        >
          Сохранить
        </button>
      </form>
      <button
        type='button'
        className={`profile__button ${
          isReductOpen ? 'profile__button_none' : ''
        }`}
        onClick={handleReductOpen}
      >
        Редактировать
      </button>
      <button
        type='button'
        onClick={handleClickLogout}
        className={`profile__button profile__button_logout ${
          isReductOpen ? 'profile__button_none' : ''
        }`}
      >
        Выйти из аккаунта
      </button>
    </main>
  );
}
