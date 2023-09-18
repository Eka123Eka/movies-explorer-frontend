import { MoviesCard } from '../../';
import dataMovies from '../../../utils/dataMovies'
import './MoviesCardList.css';

function MoviesCardList() {
  return (
    <section className='cards' aria-label='Секция с фильмами'>
      <ul className='cards-list'>
      { dataMovies.map(movie => (
          <li key={movie.id}>
            <MoviesCard key={movie.id}
                        linkMovie={movie.linkMovie}
                        nameMovie={movie.nameMovie}
                        durationMovie={movie.durationMovie}
                        isFavoriteMovie={movie.isFavoriteMovie}
            />
          </li>
        ))
      }
      </ul>
      <button className='cards_more-button'>Ещё</button>
    </section>
  );
}

export default MoviesCardList;
