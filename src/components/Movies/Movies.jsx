import { Header, SearchForm, MoviesCardList, Footer } from '../';
import './Movies.css';

function Movies( { isLogIn } ) {
  return (
    <>
    	<Header isLogIn={isLogIn}/>
      <main className='movies'>
			  <SearchForm />
        <MoviesCardList />
      </main>
      <Footer />
    </>
  );
}

export default Movies;
