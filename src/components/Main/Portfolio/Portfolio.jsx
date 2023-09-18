import arrowLink from '../../../images/arrow-link.svg';
import './Portfolio.css';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__items'>
        <li className='portfolio__item'>
          <a className='portfolio__link' target='_blank' href='https://eka123eka.github.io/how-to-learn-eka' rel='noreferrer'>
            Статичный сайт
            <img className='portfolio__arrow-link' src={arrowLink} alt='Переход на статичный сайт' />
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' target='_blank' href='https://eka123eka.github.io/russian-travel-eka/' rel='noreferrer'>
            Адаптивный сайт
            <img className='portfolio__arrow-link' src={arrowLink} alt='Переход на адаптивный сайт.' />
          </a>
        </li>
        <li className='portfolio__item'>
          <a className='portfolio__link' target='_blank' href='https://eka123eka.github.io/mesto-eka/' rel='noreferrer' >
            Одностраничное приложение
            <img className='portfolio__arrow-link' src={arrowLink} alt='Переход на одностраничное приложение.' />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
