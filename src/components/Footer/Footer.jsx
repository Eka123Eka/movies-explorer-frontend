import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__container'>
        <p className='footer__copyright'>&#169; {new Date().getFullYear()}</p>
        <ul className='footer__items'>
          <li className='footer__item'>
            <a className='footer__link' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer'>Яндекс.Практикум</a>
          </li>
          <li className='footer__item'>
            <a className='footer__link' href='https://github.com/Eka123Eka' target='_blank' rel='noreferrer'>Github</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
