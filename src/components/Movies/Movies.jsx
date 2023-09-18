import { Header, SearchForm, MoviesCardList, Footer } from '../';

function Movies( { isLogIn } ) {
  return (
    <>
    	<Header isLogIn={isLogIn}/>
      <section className='movies'>
			  <SearchForm />
        <MoviesCardList />
      </section>
      <Footer />
    </>
  );
}

export default Movies;
