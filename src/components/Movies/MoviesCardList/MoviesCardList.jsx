import { useState, useEffect } from 'react';
import { MoviesCard, CONST_FOR_MOVIES } from '../../';
import './MoviesCardList.css';

function MoviesCardList({ findingCards, onSetLikeCard, fromMoviePage }) {

  const [currentCards, setCurrentCards] = useState([]);
  const [restCards, setRestCards] = useState([]);
  const [countIncrementCard, setCountIncrementCard] = useState(0);
  const [startCards, setStartCards] = useState(0);

  function getDimension() {
    setTimeout((e) => {
    calcCards(window.innerWidth);
    }, 100);
  }

  function calcCards(width) {
    if (width < CONST_FOR_MOVIES.WIDTH_ONE_CARD) {
      setStartCards(CONST_FOR_MOVIES.CARDS_ON_320);
      setCountIncrementCard(CONST_FOR_MOVIES.CARDS_ADD_320);
    } else if (width < CONST_FOR_MOVIES.WIDTH_TWO_CARD) {
      setStartCards(CONST_FOR_MOVIES.CARDS_ON_768);
      setCountIncrementCard(CONST_FOR_MOVIES.CARDS_ADD_768);
    } else if (width < CONST_FOR_MOVIES.WIDTH_TREE_CARD) {
      setStartCards(CONST_FOR_MOVIES.CARDS_ON_1000);
      setCountIncrementCard(CONST_FOR_MOVIES.CARDS_ADD_1000);
    } else {
      setStartCards(CONST_FOR_MOVIES.CARDS_ON_1280);
      setCountIncrementCard(CONST_FOR_MOVIES.CARDS_ADD_1280);
    }
  }

  useEffect(() => {
    getDimension();
    window.addEventListener('resize', getDimension);
    return () => window.removeEventListener('resize', getDimension);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    let newStartCard = currentCards.length;
    if (startCards > newStartCard) {
      newStartCard = startCards;
    }
    setCurrentCards(findingCards.slice(0, newStartCard))
    setRestCards(findingCards.slice(newStartCard))
  }, [findingCards, startCards]);


  function handleAddCardMoreButton() {
    let newIncrementCard = countIncrementCard;
    if (startCards !== CONST_FOR_MOVIES.CARDS_ON_320) {
      newIncrementCard = newIncrementCard - currentCards.length % newIncrementCard;
    }
    const newCards = [...currentCards, ...restCards.slice(0, newIncrementCard)];
    setCurrentCards(newCards);
    setRestCards(restCards.slice(newIncrementCard));
  }

  function handleLike(card, setIsfavoriteMovies, fromMoviePage) {
    onSetLikeCard(card, setIsfavoriteMovies, fromMoviePage);
  }

  const remainMoreCards = currentCards.length > 0 && restCards.length > 0;

  return (
    <section className='cards' aria-label='Секция с фильмами'>
      <ul className='cards-list'>
        {currentCards.map(movie => (
          <li key={movie.id || movie.movieId}>
            <MoviesCard
              card={movie}
              onSetLikeCard={handleLike}
              fromMoviePage={fromMoviePage}
            />
          </li>)
        )}
      </ul>
      {remainMoreCards && fromMoviePage && <button className='cards-more-button' onClick={handleAddCardMoreButton} >Ещё</button>}
    </section>
  );
}

export default MoviesCardList;
