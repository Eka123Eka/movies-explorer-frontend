import { useState, useEffect, useContext } from 'react';
import { Header, SearchForm, MoviesCardList, Footer, Preloader, CONST_FOR_MOVIES, MESSAGES, AppContext } from '../';
import './Movies.css';

function Movies({ isLogIn, onSetLikeCard, getMoviesServer }) {
  const { isLoading } = useContext(AppContext);
  const [notFound, setNotFound] = useState('');

  const lastState = JSON.parse(localStorage.getItem('lastState')) || { isChecked: false, searchText: '', findingCards: [] };
  const [isChecked, setIsChecked] = useState(lastState.isChecked);
  const [searchText, setSearchText] = useState(lastState.searchText);
  const [findingCards, setFindingCards] = useState(lastState.findingCards);

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    if (!localStorage.getItem('cards') || localStorage.getItem('cards') === '[]') {
      getMoviesServer();
    }
  }, []);

  const handleFilterCard = (withFilter, textInput) => {
    if (!(withFilter || textInput)) {
      localStorage.removeItem('lastState');
      setFindingCards(JSON.parse(localStorage.getItem('cards')) || []);
      setIsChecked(withFilter);
      setSearchText(textInput);
    } else {
      setIsChecked(withFilter);
      setSearchText(textInput);
      setFindingCards([]);
    }
  }

  useEffect(() => {
    getCards()
  }, [isChecked, searchText, findingCards]);

  const updateDataMovies = (findCards) => {
    localStorage.setItem('lastState', JSON.stringify({ findingCards: findCards, isChecked: isChecked, searchText: searchText }));
    setFindingCards(findCards);
    setNotFound('');
  }

  function getCards() {
    if (localStorage.getItem('lastState') && findingCards.length !== 0) {
      return;
    }
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    if (searchText) {
      const findCards = cards.filter(card => (card.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(searchText.toLowerCase())) && (isChecked
          ? card.duration <= CONST_FOR_MOVIES.DURATION : true));
      findCards.length === 0 && !isLoading
        ? setNotFound(MESSAGES.SEARCH_NOT_FOUND)
        : updateDataMovies(findCards);
    } else if (isChecked) {
      const findCards = cards.filter(card => card.duration <= CONST_FOR_MOVIES.DURATION)
      findCards.length === 0 && !isLoading
        ? setNotFound(MESSAGES.SEARCH_NOT_FOUND)
        : updateDataMovies(findCards);
    } else {
      localStorage.removeItem('lastState');
      setFindingCards(findingCards);
      cards.length === 0 && !isLoading && !findingCards.length === 0
        ? setNotFound(MESSAGES.SEARCH_NOT_ADDED)
        : setNotFound('');
    }
  }

  return (
    <>
      <Header isLogIn={isLogIn} />
      <main className='movies'>
        <SearchForm
          isMoviesPage={true}
          isChecked={isChecked}
          searchQuery={searchText}
          handleFilterCard={handleFilterCard}
        />
        {notFound ? <p className="movies__not-found">{notFound}</p> : ''}
        {isLoading
          ? <Preloader />
          : <MoviesCardList
            fromMoviePage={true}
            findingCards={findingCards}
            onSetLikeCard={onSetLikeCard}
          />
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;
