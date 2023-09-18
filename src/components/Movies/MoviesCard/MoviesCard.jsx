import { useLocation } from 'react-router-dom';
import deleteButton from '../../../images/delete-button.svg';
import './MoviesCard.css';

function MoviesCard({nameMovie, durationMovie, linkMovie, isFavoriteMovie}) {
  const location = useLocation();
  const isPageMovies = location.pathname === '/movies';
  const isPageSavedMovies = location.pathname === '/saved-movies';
  return (
    <article className='card'>
      <a className='card__link' href={ linkMovie } target='_blank' rel='noreferrer'>
        <img className='card__image' src={linkMovie} alt={nameMovie} />
      </a>
      <div className='card__container'>
        <div className='card__info'>
          <h2 className='card__title'>{nameMovie}</h2>
          <p className='card__duration'>{durationMovie}</p>
        </div>
        { isPageMovies && ( isFavoriteMovie
          ? ( <button className='card__icon card__icon_favorite' aria-label='Добавлено в избранное.' type='button'></button> )
          : ( <button className='card__icon card__icon_add' aria-label='Добавить в избранное.' type='button'></button> )
          )
        }
        { isPageSavedMovies && (
          <button className='card__delete-button' aria-label='Удалить из избранного.' type='button'>
            <img className='card__delete-icon' alt='Удалить из избранного.' src={deleteButton} />
          </button>
        )}
      </div>
    </article>
  );
}

export default MoviesCard;
