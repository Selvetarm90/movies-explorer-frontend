import { useEffect, useState } from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

export default function MoviesCardList(props) {
  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    console.log(props.movies)
    if (props.movies.length > 0) {
      startMoviesList(props.movies);
    }
    HandleMovieList();
  }, [moviesList]);

  const startMoviesList = (movies) => {
    if (movies.length > 0) {
      for (let i = 0; i <= 11; i++) {
        console.log(i);
        setMoviesList(moviesList.push(movies[i]));
        console.log(moviesList);
      }
      return moviesList;
    }
  };

  const HandleMovieList = () => {
    if (moviesList.length > 0) {
      return moviesList.map((item) => (
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
      <HandleMovieList />
    </section>
  );
}
