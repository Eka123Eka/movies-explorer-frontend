import { useLocation } from 'react-router-dom';
import { Logo, Navigation, HeaderButton } from '../';
import './Header.css';

function Header({ isLogIn }) {
  const location = useLocation();
  return (
    <header className={isLogIn ? 'header header_login' : 'header'}>
      <Logo />
      {isLogIn
        ? <Navigation />
        : (location.pathname !== '/signup') && (location.pathname !== '/signin') && (
          <nav className='header__group-button'>
            <HeaderButton
              textButton = 'Регистрация'
              to='/signup'
              className='header__register-button header__link'
            />
            <HeaderButton
              textButton = 'Войти'
              to='/signin'
              className='header__login-button  header__link'
            />
          </nav>
        )
      }
    </header>
  );
}

export default Header;
