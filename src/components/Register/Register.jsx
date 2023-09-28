import { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Logo, useFormValidation, AppContext } from '../';
import './Register.css';

function Register({ onSubmit }) {
  const { values, handleChange, errors, isValid, resetForm, } = useFormValidation({});
  const { isLoading } = useContext(AppContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name: values.name, email: values.email, password: values.password })
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  return (
    <section className='register'>
      <div className='register__container'>
        <Logo />
        <h2 className='register__title'>Добро пожаловать!</h2>
        <form className='register__form' onSubmit={handleSubmit}>
          <label className='register__label'>
            Имя
            <input
              className='register__input'
              name='name' type='text'
              placeholder='Представьтесь'
              minLength='2' maxLength='100'
              required
              value={values.name || ''}
              onChange={handleChange}
              disabled={isLoading && 'disabled'}
            />
            <span className='register__input-error'>{errors.name}</span>
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
              value={values.email || ''}
              onChange={handleChange}
              disabled={isLoading && 'disabled'}
            />
            <span className='register__input-error'>{errors.email}</span>
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
              value={values.password || ''}
              onChange={handleChange}
              disabled={isLoading && 'disabled'}
            />
            <span className='register__input-error register__input-error_last'>{errors.password}</span>
          </label>
          <button className={`register__button ${(!isValid || isLoading) ? 'register__button_disabled' : ''}`} type='submit'>
            {(isLoading) ? 'Идет регистрация...' : 'Зарегистрироваться'}
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

