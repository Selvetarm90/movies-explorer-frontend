import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../../Preloader/Preloader';
import './MoviesCardList.css';

export default function MoviesCardList(props) {
  return(
    <section className='cards'>
      <MoviesCard buttonSavedCard={props.buttonSavedCard || false}/>
      <MoviesCard buttonSavedCard={props.buttonSavedCard || false}/>
      <MoviesCard buttonSavedCard={props.buttonSavedCard || false}/>
      <MoviesCard buttonSavedCard={props.buttonSavedCard || false}/>
      <MoviesCard buttonSavedCard={props.buttonSavedCard || false}/>
      <MoviesCard buttonSavedCard={props.buttonSavedCard || false}/>
      <MoviesCard buttonSavedCard={props.buttonSavedCard || false}/>
      <MoviesCard buttonSavedCard={props.buttonSavedCard || false}/>
      <MoviesCard buttonSavedCard={props.buttonSavedCard || false}/>
      <Preloader />
    </section>
  )
}
