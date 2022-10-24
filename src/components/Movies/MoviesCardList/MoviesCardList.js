
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList(props) {

  const HandleMoviesList = () => {
    if (props.moviesList.length > 0) {
      console.log(props.moviesList)
      return props.moviesList.map((item) => (
        <MoviesCard
          movie={item}
          key={item.id}
          buttonSavedCard={props.buttonSavedCard || false}
        />
      ));
    }
    return 'Ничего нет!!!';
  };

  return (
    <section className='cards'>
      <HandleMoviesList />
    </section>
  );
}
