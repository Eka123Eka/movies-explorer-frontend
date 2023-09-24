import { useState, useEffect } from 'react';
import { Header, SearchForm, MoviesCardList, Footer, Preloader, const_for_movies } from '../';
import './Movies.css';

function Movies( { isLogIn, cards, favoriteMovies, onSetLikeCard} ) {
  const dataUser = localStorage.getItem('dataUser');
  const currentCards = JSON.parse(dataUser.currentCards) || [];
  const searchQuery  = dataUser.searchQuery || '';
  const stateCheckBox = JSON.parse(dataUser.stateCheckBox) || false;

  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [notFound, setNotFound] = useState('');
  const [findingCards, setFindingCards] = useState([]);
  const [isChecked, setIsChecked] = useState(stateCheckBox);

  useEffect( () => {
    /* eslint-disable react-hooks/exhaustive-deps */
    setIsLoading(true);
    searchQuery && setSearchText(searchQuery);
    stateCheckBox && setIsChecked(stateCheckBox);
    currentCards && setFindingCards(currentCards);
    setIsLoading(false);
  }, []);

  function handleCheckBox () {
    setIsChecked(!isChecked);
  }

  function getCards () {
    dataUser.searchQuery = searchText;
    dataUser.stateCheckBox = JSON.stringify(isChecked);
    if (searchText) {
      const findCards = cards.filter(card => {
        return (
          card.nameRU.toLowerCase().includes(searchText.toLowerCase()) && isChecked
            ? card.duration <= const_for_movies.duration
            : true
        );
      });
      setFindingCards (findCards);

      findCards.length === 0
        ? setNotFound('По вашему запросу ничего не найдено')
        : setNotFound('');

      dataUser.currentCards = JSON.stringify(findCards);

    } else {
      setFindingCards (cards);
      cards.length === 0
        ? setNotFound('Произошла ошибка. На сервере нет ни одной карточки')
        : setNotFound('');

      dataUser.currentCards = JSON.stringify([]);
    }
    localStorage.setItem('dataUser', dataUser);
    setIsLoading(false);
  }

  return (
    <>
    	<Header isLogIn={isLogIn}/>
      <main className='movies'>
			  <SearchForm
          searchText={searchText}
          setSearchText={setSearchText}
          isChecked={isChecked}
          handleCheckBox={handleCheckBox}
          getCards={getCards}
        />
        { notFound ?  <p className="movies__not-found">{notFound}</p> : ''}
        { isLoading
          ? <Preloader />
          : <MoviesCardList
              cards={findingCards}
              favoriteMovies={favoriteMovies}
              onSetLikeCard={onSetLikeCard}
            />
        }
      </main>
      <Footer />
    </>
  );
}

export default Movies;
