import photo from '../../../images/portfolio_photo.JPG';
import './AboutMe.css';

function AboutMe() {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <div className='about-me__container'>
        <div className='about-me__profile'>
          <div className='about-me__about-me'>
            <h3 className='about-me__name'>Екатерина</h3>
            <p className='about-me__career'>Королева огорода, 40 лет</p>
            <p className='about-me__info'>Я живу в городе Новочебоксарск. Воспитываю ребенка, мечтаю о большой семье.</p>
          </div>
          <ul className='about-me__contacts'>
            <li className='about-me__item'>
              <a className='about-me__link' href='https://github.com/Eka123Eka' target='_blank' rel='noreferrer'>Github</a>
            </li>
          </ul>
        </div>
        <img className='about-me__photo' src={photo} alt='Автор дипломной работы' />
      </div>
    </section>
  );
}

export default AboutMe;
