import './Popup.css';

export default function Popup({message, onClick}) {
  const handleClick = (evt) => {
    evt.preventDefault();
    onClick();
  };

  return(
    <div
      className={`popup ${message && 'popup_opened'}`}
      onClick={handleClick}
    >
      <form
        className='popup__container'
        onSubmit={handleClick}>
        <p className='popup__message'>{message}</p>
        <button
          type='submit'
          className='popup__button'>
            Ок
        </button>
      </form>
    </div>
  );
}
