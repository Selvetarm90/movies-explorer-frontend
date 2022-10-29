import { useContext } from 'react';
import './MoviesCard.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';

export default function MoviesCard({ handleSaveMovie, ...props }) {
  const currentUser = useContext(CurrentUserContext);

  const handleClick = () => {
    handleSaveMovie({
      country: props.movie.country,
      director: props.movie.director,
      duration: props.movie.duration,
      year: props.movie.year,
      description: props.movie.description,
      image: `https://api.nomoreparties.co${props.movie.image.url}`,
      trailerLink: props.movie.trailerLink,
      thumbnail: `https://api.nomoreparties.co${props.movie.image.formats.thumbnail.url}`,
      owner: currentUser._id,
      movieId: props.movie.id,
      nameRU: props.movie.nameRU,
      nameEN: props.movie.nameEN
    })
  }
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
        onClick={handleClick}
        className={`card__button ${
          props.buttonSavedCard ? 'card__button_del-movie' : ''
        }`}
      >
        {props.buttonSavedCard ? '' : 'Сохранить'}
      </button>
    </article>
  );
}
