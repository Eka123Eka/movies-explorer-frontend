import { Link } from 'react-router-dom';
import { Logo } from '../';
import './Register.css';

function Register() {
  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form'>
          <label className='register__label'>
            E-mail
            <input
              className='register__input'
              name='name' type='text'
              placeholder='Представьтесь'
              minLength='2' maxLength='100'
              required
            />
            <span className='register__input-error'></span>
          </label>
          <label className='register__label'>
            E-mail
            <input
              className='register__input'
              name='email' type='email'
              placeholder='Укажите электронную почту'
              minLength='5' maxLength='100'
              autoComplete='off'
              autoCapitalize='none'
              required
            />
            <span className='register__input-error'></span>
          </label>
          <label className='register__label'>
            Пароль
            <input
              className='register__input'
              name='password' type='password'
              placeholder='Задумайте пароль'
              minLength='4' maxLength='40'
              autoComplete='off'
              autoCapitalize='none'
              required
            />
            <span className='register__input-error register__input-error_last'>Что-то пошло не так...</span>
          </label>
          <button className='register__button' type='submit'>
            Войти
          </button>
          <p className='register__text-item'>
            Уже зарегистрированы?
            <span><Link className='register__link-item' to='/signin'> Войти</Link></span>
          </p>
        </form>
      </div>
    </section>
  );
}

export default Register;

