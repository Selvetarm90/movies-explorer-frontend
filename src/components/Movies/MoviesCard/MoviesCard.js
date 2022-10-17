import './MoviesCard.css';

export default function MoviesCard(props) {
  return (
    <article className='card'>
      <h2 className='card__name'>{props.movie.nameRU}</h2>
      <p className='card__duration'>{`${props.movie.duration} минут`}</p>
      <img
        className='card__image'
        alt={props.movie.nameRU}
        src={`https://api.nomoreparties.co${props.movie.image.formats.thumbnail.url}`}
      />
      <button
        type='button'
        className={`card__button ${
          props.buttonSavedCard ? 'card__button_del-movie' : ''
        }`}
      >
        {props.buttonSavedCard ? '' : 'Сохранить'}
      </button>
    </article>
  );
}
