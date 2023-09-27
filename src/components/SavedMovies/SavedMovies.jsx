import { useState, useEffect, useContext } from 'react';
import { Header, SearchForm, MoviesCardList, Footer, Preloader, CONST_FOR_MOVIES, MESSAGES, AppContext } from '../';
import './SavedMovies.css';

function SavedMovies({ isLogIn, onSetLikeCard }) {
  const { isLoading } = useContext(AppContext);
  const [notFound, setNotFound] = useState('');

  const [isChecked, setIsChecked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [findingCards, setFindingCards] = useState([]);

  const handleFilterCard = (withFilter, textInput) => {
    setIsChecked(withFilter);
    setSearchText(textInput);
  }

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    getCards();
  }, [isChecked, searchText]);

  function getCards() {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const cards = JSON.parse(localStorage.getItem('cards')) || [];
    const filterCards = cards.filter(card => favoriteMovies.some(item => item.movieId === card.id));
    if (searchText) {
      const findCards = filterCards.filter(card => (card.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
        card.nameEN.toLowerCase().includes(searchText.toLowerCase())) && (isChecked
          ? card.duration <= CONST_FOR_MOVIES.DURATION : true));
      setFindingCards(findCards);
      findCards.length === 0 && !isLoading
        ? setNotFound(MESSAGES.SEARCH_NOT_FOUND)
        : setNotFound('');

    } else if (isChecked) {
      const findCards = filterCards.filter(card => card.duration <= CONST_FOR_MOVIES.DURATION)
      setFindingCards(findCards);
      findCards.length === 0 && !isLoading
        ? setNotFound(MESSAGES.SEARCH_NOT_FOUND)
        : setNotFound('');
    } else {
      setFindingCards(filterCards);
      favoriteMovies.length === 0 && !isLoading
        ? setNotFound(MESSAGES.SEARCH_NOT_FOUND)
        : setNotFound('');
    }
  }

  return (
    <>
      <Header isLogIn={isLogIn} />
      <main className='saved-movies'>
        <SearchForm
          isMoviesPage={false}
          isChecked={isChecked}
          searchText={searchText}
          handleFilterCard={handleFilterCard}
        />
        {notFound ? <p className="movies__not-found">{notFound}</p> : ''}
        {isLoading
          ? <Preloader />
          : <MoviesCardList
            fromMoviePage={false}
            findingCards={findingCards}
            onSetLikeCard={onSetLikeCard}
          />
        }
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
