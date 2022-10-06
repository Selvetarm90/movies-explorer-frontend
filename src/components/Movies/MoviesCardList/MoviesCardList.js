import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';
import './MoviesCardList.css';

export default function MoviesCardList(props) {
  return (

    <section className='cards'>
      {props.movies.map((item) => (
        <MoviesCard
          movie={item}
          key={item.id}
          buttonSavedCard={props.buttonSavedCard || false}
        />
      ))}
      <Preloader />
    </section>
  );
}
