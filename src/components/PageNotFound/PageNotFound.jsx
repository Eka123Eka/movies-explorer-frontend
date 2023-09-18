import { Link } from 'react-router-dom';
import './PageNotFound.css';

function PageNotFound () {
  return(
    <main className='page-not-found'>
      <h2 className='page-not-found__title'>404</h2>
      <p className='page-not-found__text'>Страница не найдена</p>
      <Link className='page-not-found__link' to='/' >Назад</Link>
    </main>
  );
}

export default PageNotFound;
