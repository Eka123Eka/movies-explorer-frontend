import { Header, Footer, AboutMe, AboutProject, Portfolio, Promo, Techs  } from '../';
import './Main.css';

function Main ({isLogIn}) {
  return (
  <>
    <Header isLogIn = {isLogIn} />
    <main className='main'>
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
    </main>
    <Footer />
  </>
  );
}

export default Main;
