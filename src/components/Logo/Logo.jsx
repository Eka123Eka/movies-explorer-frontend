import logo from '../../images/header_logo.svg';
import { Link } from 'react-router-dom';
import './Logo.css';

function Logo() {

  return (
    <Link to="/" className="logo-link">
      <img className="logo" src={logo} alt="Логотип сайта Киноэксперт." />
    </Link>
  )
}

export default Logo;
