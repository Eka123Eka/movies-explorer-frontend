import { useState, useEffect, useMemo } from 'react';
import { MoviesCard, const_for_movies } from '../../';
import './MoviesCardList.css';

function MoviesCardList({ findingCards, favoriteMovies, onSetLikeCard, fromMoviePage }) {
  const [dimension, setDimension] = useState({ width: 0 });
  const [countIncrementCard, setCountIncrementCard] = useState(0);
  const [startCards, setStartCards] = useState(0);

  function getDimension() {
    setTimeout((e) => { setDimension({ width: window.innerWidth}) }, 100);
  }

  useEffect(() => {
    setCountIncrementCard(0);
    getDimension();

    window.addEventListener("resize", getDimension);
    return () => window.removeEventListener("resize", getDimension);
  }, []);

  useEffect(() => {
    setCountIncrementCard(0);
  }, [findingCards]);

  function handleAddCardMoreButton() {
    let countNewCards;
    if (dimension.width < const_for_movies.width_one_card) {countNewCards = const_for_movies.cards_add_320}
    else if (dimension.width < const_for_movies.width_two_card) {countNewCards = const_for_movies.cards_add_768}
    else if (dimension.width < const_for_movies.width_three_card) {countNewCards = const_for_movies.cards_add_1000}
    else {countNewCards = const_for_movies.cards_add_1280}
    if (!(dimension.width < const_for_movies.width_one_card)) {
      countNewCards = (countNewCards - (startCards+  countIncrementCard + countNewCards)%countNewCards);
    }
    setCountIncrementCard(prevValue => prevValue + countNewCards);
  }

  const currentCards = useMemo(() => {
    if (!fromMoviePage) {
      return findingCards;
    }
    let countCards = 0;
    if (dimension.width < const_for_movies.width_one_card) {countCards = const_for_movies.cards_on_320}
    else if (dimension.width < const_for_movies.width_two_card) {countCards = const_for_movies.cards_on_768}
    else if (dimension.width < const_for_movies.width_three_card) {countCards = const_for_movies.cards_on_1000}
    else {countCards = const_for_movies.cards_on_1280}
    setStartCards(countCards);
    // if (findingCards && findingCards.length < cards.length) {
    //   return findingCards;
    // } else {
      return findingCards.slice(0, countCards + countIncrementCard);
    //}
    /* eslint-disable react-hooks/exhaustive-deps */
    }, [findingCards, countIncrementCard, dimension]);

  const remainCards = findingCards.length > startCards && findingCards.length > currentCards.length;

  return (
    <section className='cards' aria-label='Секция с фильмами'>
      <ul className='cards-list'>
        { currentCards.map(movie => (
          <li key={movie.id || movie.movieId}>
            <MoviesCard
              card={movie}
              favoriteMovies = {favoriteMovies}
              onSetLikeCard = {onSetLikeCard}
              fromMoviePage = {fromMoviePage}
            />
          </li>)
        )}
      </ul>
      { remainCards && fromMoviePage && <button className='cards-more-button' onClick={handleAddCardMoreButton} >Ещё</button> }
    </section>
  );
}

export default MoviesCardList;
