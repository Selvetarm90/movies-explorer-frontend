import MoviesCard from '../MoviesCard/MoviesCard';
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
    </section>
  )
}
