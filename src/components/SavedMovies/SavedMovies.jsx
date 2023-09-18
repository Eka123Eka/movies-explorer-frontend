import { Header, SearchForm, MoviesCardList, Footer } from '../';
import './SavedMovies.css';

function SavedMovies({ isLogIn }) {
  return (
    <>
    	<Header isLogIn={isLogIn}/>
      <section className='saved-movies'>
			  <SearchForm />
        <MoviesCardList />
      </section>
      <Footer />
    </>
  );
}

export default SavedMovies;
