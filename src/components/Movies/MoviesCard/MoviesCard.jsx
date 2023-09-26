import deleteButton from '../../../images/delete-button.svg';
import { const_for_movies } from '../../';
import './MoviesCard.css';

function MoviesCard({card, favoriteMovies, onSetLikeCard, fromMoviePage}) {

  const image = card.image.url ? `${const_for_movies.baseUrl}${card.image.url}` : card.image;
  const isfavoriteMovies = favoriteMovies ? favoriteMovies.some((i) => i.movieId === card.id) : false;

  function toggleLike() {
    onSetLikeCard(card, isfavoriteMovies);
  }

  function convertTime (time) {
    let m = time % 60;
    let h = (time-m)/60;
    return `${h.toString()}ч${m < 10 ? '0' : ''}${m.toString()}м`;
  }

  return (
    <article className='card'>
      <a className='card__link' href={ card.trailerLink } target='_blank' rel='noreferrer'>
        <img className='card__image' src={image} alt={card.nameRU} />
      </a>
      <div className='card__container'>
        <div className='card__info'>
          <h2 className='card__title'>{card.nameRU}</h2>
          <p className='card__duration'>{convertTime(card.duration)}</p>
        </div>
        { fromMoviePage && ( isfavoriteMovies
          ? ( <button
              className='card__icon card__icon_favorite'
              aria-label='Добавлено в избранное.'
              onClick={toggleLike}
              type='button'></button> )
          : ( <button
              className='card__icon card__icon_add'
              aria-label='Добавить в избранное.'
              onClick={toggleLike}
              type='button'></button> )
          )
        }
        { !fromMoviePage && (
          <button
            className='card__delete-button'
            aria-label='Удалить из избранного.'
            onClick={toggleLike}
            type='button'>
              <img className='card__delete-icon' alt='Удалить из избранного.' src={deleteButton} />
          </button>
        )}
      </div>
    </article>
  );
}

export default MoviesCard;
