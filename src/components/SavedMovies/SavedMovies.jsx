import { useState, useEffect, useContext } from 'react';
import { Header, SearchForm, MoviesCardList, Footer, Preloader, const_for_movies, messages, AppContext } from '../';
import './SavedMovies.css';

function SavedMovies({ isLogIn, cards, favoriteMovies, updateFavorite, onSetLikeCard }) {
  const {isLoading} = useContext(AppContext);
  const [notFound, setNotFound] = useState('');

  const [isChecked, setIsChecked] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [findingCards, setFindingCards] = useState([]);

  const handleCheckBox = (withFilter, textInput) => {
    setIsChecked(withFilter);
    setSearchText(textInput);
  }
  const handleSubmitSearch = (textSearch) => {
    let updateCards = (searchText === textSearch) && (textSearch === '');
    setSearchText(textSearch);
    if (updateCards) {getCards (isChecked, searchText)};
  };
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    updateFavorite();
  } , [] )
  useEffect(() => {
    /* eslint-disable react-hooks/exhaustive-deps */
    getCards(isChecked, searchText);
  }, [isChecked, searchText, favoriteMovies]);

  function getCards (isChecked, searchText) {
    const filterCards = cards.filter(card => favoriteMovies.some(item => item.movieId === card.id));
    if (searchText) {
      const findCards = filterCards.filter( card => (card.nameRU.toLowerCase().includes(searchText.toLowerCase()) ||
                                              card.nameEN.toLowerCase().includes(searchText.toLowerCase())) && (isChecked
                                              ? card.duration <= const_for_movies.duration : true));
      setFindingCards(findCards);
      findCards.length === 0 && !isLoading
        ? setNotFound(messages.search_not_found)
        : setNotFound('');

    } else if (isChecked) {
        const findCards = filterCards.filter(card => card.duration <= const_for_movies.duration)
        setFindingCards (findCards);
        findCards.length === 0 && !isLoading
          ? setNotFound(messages.search_not_found)
          : setNotFound('');
    } else {
        setFindingCards (filterCards);
        favoriteMovies.length === 0 && !isLoading
          ? setNotFound(messages.search_not_added)
          : setNotFound('');
    }
  }

  return (
    <>
    	<Header isLogIn={isLogIn}/>
      <main className='saved-movies'>
			  <SearchForm
          isMoviesPage={false}
          isChecked={isChecked}
          searchText={searchText}
          onSubmitSearch={handleSubmitSearch}
          handleCheckBox={handleCheckBox}
        />
        { notFound ?  <p className="movies__not-found">{notFound}</p> : ''}
        { isLoading
          ? <Preloader />
          : <MoviesCardList
              fromMoviePage = {false}
              findingCards = {findingCards}
              favoriteMovies={favoriteMovies}
              onSetLikeCard={onSetLikeCard}
            />
        }
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
