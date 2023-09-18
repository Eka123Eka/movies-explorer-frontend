import { Header, SearchForm, MoviesCardList, Footer } from '../';
import './SavedMovies.css';

function SavedMovies({ isLogIn }) {
  return (
    <>
    	<Header isLogIn={isLogIn}/>
      <main className='saved-movies'>
			  <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default SavedMovies;
