import { Link } from 'react-router-dom';
import './HeaderButton.css';

function HeaderButton({ textButton, ...rest }) {

  return (
    <Link {...rest}>
      {textButton}
    </Link>
  )
}

export default HeaderButton;
