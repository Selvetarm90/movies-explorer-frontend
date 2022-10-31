import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';
import SearchForm from '../Movies/SearchForm/SearchForm';
import './SavedMovies.css';

export default function SavedMovies ({movies, handleDeleteMovie}) {
  return(
    <main className='saved-movies'>
      <SearchForm />
      <MoviesCardList buttonSavedCard={true} handleDeleteMovie={handleDeleteMovie}  moviesList={movies}/>
      <button type='button' className='movies__button-more'>
        Ещё
      </button>
    </main>
  )
}
