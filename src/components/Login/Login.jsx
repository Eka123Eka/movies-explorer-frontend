import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Logo, useFormValidation, AppContext} from '../';
import './Login.css';

function Login({ onSubmit }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation({});
  const { isLoading } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({email: values.email, password: values.password});
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className='login'>
      <div className='login__container'>
        <Logo />
        <h2 className='login__title'>Рады видеть!</h2>
        <form className='login__form' onSubmit={handleSubmit}>
          <label className='login__label'>
            E-mail
            <input
              className='login__input'
              name='email' type='email'
              placeholder='Укажите электронную почту'
              minLength='5' maxLength='100'
              autoComplete='off'
              autoCapitalize='none'
              required
              value={values.email || ""}
              onChange={handleChange}
              disabled={isLoading && 'disabled'}
            />
            <span className='login__input-error'>{errors.email}</span>
          </label>
          <label className='login__label'>
            Пароль
            <input
              className='login__input'
              name='password' type='password'
              placeholder='Введите пароль'
              minLength='4' maxLength='40'
              autoComplete='off'
              autoCapitalize='none'
              required
              value={values.password || ""}
              onChange={handleChange}
              disabled={isLoading && 'disabled'}
            />
            <span className='login__input-error login__input-error_last'>{errors.password}</span>
          </label>
          <button className={`login__button ${(!isValid || isLoading) ? 'login__button_disabled' : ''}`} type='submit'>
            {( isLoading) ? 'Авторизуемся...' : 'Войти'}
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
