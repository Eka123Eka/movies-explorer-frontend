import { NavTab } from '../../';
import promo from '../../../images/promo_logo.svg';
import './Promo.css';

function Promo() {
  return (
    <section className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета Веб&#8209;разработки.
        </h1>
        <h2 className='promo__text'>
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </h2>
        <NavTab />
      </div>
      <img className="promo__logo" src={promo} alt='Логотип титульной страницы.' />
    </section>

  );
}

export default Promo;
