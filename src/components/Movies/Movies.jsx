import { useState, useEffect, useContext } from 'react';
import { Header, SearchForm, MoviesCardList, Footer, Preloader, const_for_movies, messages, AppContext } from '../';
import './Movies.css';

function Movies( { isLogIn, cards, favoriteMovies, onSetLikeCard, getMoviesServer } ) {
  const {isLoading} = useContext(AppContext);
  const [notFound, setNotFound] = useState('');

  const [isChecked, setIsChecked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [findingCards, setFindingCards] = useState([]);

  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    getMoviesServer();
    localStorage.setItem('cards', JSON.stringify(cards));
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
  }, []);

  const handleCheckBox = (withFilter, textInput) => {
    setIsChecked(withFilter);
    setSearchText(textInput);
    localStorage.setItem('checkBox', JSON.stringify(withFilter));
    localStorage.setItem('searchQuery', textInput);
    localStorage.setItem('currentCards', JSON.stringify([]));
  }
  const handleSubmitSearch = (textSearch) => {
    let updateCards = (searchText === textSearch) && (textSearch === '');
    setSearchText(textSearch);
    localStorage.setItem('searchQuery', textSearch);
    localStorage.setItem('currentCards', JSON.stringify([]));
    if (updateCards) {getCards (isChecked, searchText)};
  };
  useEffect(() => {
    getCards (isChecked, searchText)
  }, [isChecked, searchText]);
  function getCards (isChecked, searchText) {
    if (localStorage.getItem('currentCards') && JSON.parse(localStorage.getItem('currentCards')).length !==0) {
      setFindingCards(JSON.parse(localStorage.getItem('currentCards')));
      return;
    }
    if (searchText) {
      const findCards = cards.filter( card => (card.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
                                              card.nameEN.toLowerCase().includes(searchText.toLowerCase())) && (isChecked
                                              ? card.duration <= const_for_movies.duration : true));
      setFindingCards(findCards);

      findCards.length === 0 && !isLoading
        ? setNotFound(messages.search_not_found)
        : setNotFound('');

    } else if (isChecked) {
      const findCards = cards.filter(card => card.duration <= const_for_movies.duration)
      setFindingCards (findCards);

      findCards.length === 0 && !isLoading
        ? setNotFound(messages.search_not_found)
        : setNotFound('');

    } else if (!localStorage.getItem('currentCards')) {
      setFindingCards ([]);
      setNotFound('');
      return;
    } else {
      setFindingCards (cards);
      cards.length === 0 && !isLoading
        ? setNotFound(messages.search_error)
        : setNotFound('');
    }
    localStorage.setItem('currentCards', JSON.stringify(findingCards));
  }

  return (
    <>
    	<Header isLogIn={isLogIn}/>
      <main className='movies'>
        <SearchForm
          isMoviesPage={true}
          isChecked={JSON.parse(localStorage.getItem('checkBox')) || isChecked}
          searchQuery={localStorage.getItem('searchQuery') || searchText}
          onSubmitSearch={handleSubmitSearch}
          handleCheckBox={handleCheckBox}
        />
        { notFound ?  <p className="movies__not-found">{notFound}</p> : ''}
        { isLoading
          ? <Preloader />
          : <MoviesCardList
              fromMoviePage={true}
              findingCards={findingCards}
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
