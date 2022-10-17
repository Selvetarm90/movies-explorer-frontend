import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

export default function Movies({movies}) {
  const handleClick = () => {
    const moviesList = [];
    for (let i = 0; i<=2; i++) {

    }
  }
  return (
    <main className='movies'>
      <SearchForm />
      <MoviesCardList movies={movies} />
      <button type='button' className='movies__button-more' onClick={handleClick}>
        Ещё
      </button>
    </main>
  );
}
