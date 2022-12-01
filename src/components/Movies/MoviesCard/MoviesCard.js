import './MoviesCard.css';

export default function MoviesCard({
  handleSaveMovie,
  handleDeleteMovie,
  ...props
}) {
  const handleClick = () => {
    if (!props.movie.buttonStatusSave) {
      handleSaveMovie({
        country: props.movie.country,
        director: props.movie.director,
        duration: props.movie.duration,
        year: props.movie.year,
        description: props.movie.description,
        image: `https://api.nomoreparties.co${props.movie.image.url}`,
        trailerLink: props.movie.trailerLink,
        thumbnail: `https://api.nomoreparties.co${props.movie.image.formats.thumbnail.url}`,
        movieId: props.movie.id,
        nameRU: props.movie.nameRU,
        nameEN: props.movie.nameEN,
      });
    }
    if (props.movie.buttonStatusSave) {
      handleDeleteMovie('', props.movie.id);
    }
  };

  const handleDelete = () => {
    handleDeleteMovie(props.movie._id, props.movie.movieId);
  };

  return (
    <article className='card'>
      <h2 className='card__name'>{props.movie.nameRU}</h2>
      <p className='card__duration'>{`${props.movie.duration} минут`}</p>
      <a
        className='card__link'
        href={props.movie.trailerLink || 'https://www.youtube.com'}
        target='_blank'
        rel='noreferrer'
      >
        <img
          className='card__image'
          alt={props.movie.nameRU}
          src={
            props.movie.owner
              ? props.movie.thumbnail
              : `https://api.nomoreparties.co${props.movie.image.formats.thumbnail.url}`
          }
        />
      </a>

      <button
        type='button'
        onClick={props.movie.owner ? handleDelete : handleClick}
        className={`card__button ${
          props.buttonSavedCard
            ? 'card__button_del-movie'
            : props.movie.buttonStatusSave
            ? 'card__button_saved'
            : ''
        }`}
      >
        {props.buttonSavedCard
          ? ''
          : props.movie.buttonStatusSave
          ? ''
          : 'Сохранить'}
      </button>
    </article>
  );
}
