import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({movies}) {
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList movies={movies} />
      <button type='button' className='movies__button-more'>
        Ещё
      </button>
    </main>
  );
}
