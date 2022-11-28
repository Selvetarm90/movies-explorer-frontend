import Preloader from '../../Preloader/Preloader';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList({
  handleSaveMovie,
  handleDeleteMovie,
  buttonSavedStatus,
  ...props
}) {
  const HandleMoviesList = () => {
    if (props.moviesList.length > 0 && !props.message) {
      console.log(props.moviesList);
      return props.moviesList.map((item) => (
        <MoviesCard
          handleSaveMovie={handleSaveMovie}
          handleDeleteMovie={handleDeleteMovie}
          movie={item}
          key={item.owner ? item._id : item.id}
          buttonSavedCard={props.buttonSavedCard || false}
        />
      ));
    }
    return (
      <p className='cards__not-found'>{`${
        props.message || 'Ничего не найдено.'
      }`}</p>
    );
  };

  return (
    <section

      className={`cards${props.moviesList.length && !props.message ? '' : '__not-found'}`}
    >
      {props.isLoading && <Preloader/>}
      <HandleMoviesList />
    </section>
  );
}
