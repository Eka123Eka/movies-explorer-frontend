import { useState, useEffect, useCallback } from 'react';
import { MoviesCard, const_for_movies } from '../../';
/*import dataMovies from '../../../utils/dataMovies'*/
import './MoviesCardList.css';

function MoviesCardList(cards, favoriteMovies, onSetLikeCard) {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });
  const [countAddCard, setCountAddCard] = useState(0);
  const [startCards, setStartCards] = useState(0);

  function getDimension() {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  }

  useEffect(() => {
    /*setCountAddCard(0);*/
    getDimension();

    window.addEventListener("resize", getDimension);
    return () => window.removeEventListener("resize", getDimension);
  }, []);

  useEffect(() => {
    setCountAddCard(0);
  }, [cards]);

  function handleAddCardMoreButton() {
    let countNewCards;
    if (dimension.width < const_for_movies.width_one_card) {countNewCards = const_for_movies.cards_add_320}
    else if (dimension.width < const_for_movies.width_two_card) {countNewCards = const_for_movies.cards_add_768}
    else if (dimension.width < const_for_movies.width_three_card) {countNewCards = const_for_movies.cards_add_1000}
    else {countNewCards = const_for_movies.cards_add_1280}
    setCountAddCard(prevValue => prevValue + countNewCards);
  }

  const currentCards = useCallback(() => {
    let countCards = 0;
    if (dimension.width < const_for_movies.width_one_card) {countCards = const_for_movies.cards_on_320}
    else if (dimension.width < const_for_movies.width_two_card) {countCards = const_for_movies.cards_on_768}
    else if (dimension.width < const_for_movies.width_three_card) {countCards = const_for_movies.cards_on_1000}
    else {countCards = const_for_movies.cards_on_1280}
    setStartCards(countCards);
    return cards.slice(0, countCards + countAddCard);
  }, [cards, countAddCard, dimension]);

  const remainCards = cards.length > startCards && cards.length > currentCards.length;
  return (
    <section className='cards' aria-label='Секция с фильмами'>
      <ul className='cards-list'>
        { currentCards.map(movie => (
          <li key={movie._id}>
            <MoviesCard card={movie}
                        favoriteMovies = {favoriteMovies}
                        onSetLikeCard = {onSetLikeCard}
            />
          </li>)
        )}
      </ul>
      { remainCards && <button className='cards-more-button' onClick={handleAddCardMoreButton} >Ещё</button> }
    </section>
  );
}

export default MoviesCardList;
