import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Logo, useFormValidation } from '../';
import './Register.css';

function Register({ onSubmit }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation({});
  const [isBlockForm, setIsBlockForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submit');
    setIsBlockForm(true);

  };
  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (isBlockForm) {
      onSubmit({ name: values.name, email: values.email, password: values.password })
    }
    setIsBlockForm(false);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isBlockForm])

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
              disabled={isBlockForm && 'disabled'}
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
              disabled={isBlockForm && 'disabled'}
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
              disabled={isBlockForm && 'disabled'}
            />
            <span className='register__input-error register__input-error_last'>{errors.password}</span>
          </label>
          <button className={`register__button ${(!isValid || isBlockForm) ? 'register__button_disabled' : ''}`} type='submit'>
            {(isBlockForm) ? 'Идет регистрация...' : 'Зарегистрироваться'}
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

