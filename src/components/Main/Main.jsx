import { Header, Footer, AboutMe, AboutProject, Portfolio, Promo, Techs  } from '../';

function Main ({isLogIn}) {
  return (
  <>
    <Header isLogIn = {isLogIn} />
    <Promo />
    <AboutProject />
    <Techs />
    <AboutMe />
    <Portfolio />
    <Footer />
  </>
  );
}

export default Main;
