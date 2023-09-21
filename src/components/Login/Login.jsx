import { Link } from 'react-router-dom';
import { Logo } from '../';
import './Login.css';

function Login() {
  return (
    <section className='login'>
      <div className='login__container'>
        <Logo />
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form'>
          <label className='login__label'>
            E-mail
            <input
              className='login__input'
              name='email' type='email'
              placeholder='Укажите электронную почту'
              minLength='5' maxLength='100'
              autoComplete='off'
              autocapitalize='none'
              required
            />
            <span className='login__input-error'></span>
          </label>
          <label className='login__label'>
            Пароль
            <input
              className='login__input'
              name='password' type='password'
              placeholder='Введите пароль'
              minLength='4' maxLength='40'
              autoComplete='off'
              autocapitalize='none'
              required
            />
            <span className='login__input-error'></span>
          </label>
          <button className='login__button' type='submit'>
            Войти
          </button>
          <p className='login__text-item'>
            Еще не зарегистрированы?
            <span><Link className='login__link-item' to='/signup'> Регистрация</Link></span>
          </p>
        </form>
      </div>
    </section>

  );
}

export default Login;
