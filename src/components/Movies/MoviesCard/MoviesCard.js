import './MoviesCard.css';
import film from '../../../images/film1.jpg';

export default function MoviesCard(props) {
  return (
    <article className='card'>
      <h2 className='card__name'>{'В погоне за Бенкси'}</h2>
      <p className='card__duration'>{27 + 'минут'}</p>
      <img className='card__image' alt={'В погоне за Бенкси'} src={film} />
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
