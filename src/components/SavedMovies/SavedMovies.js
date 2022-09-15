import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies () {
  return(
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList buttonSavedCard={true} />
    </main>
  )
}
