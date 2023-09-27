import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo, useFormValidation } from '../';
import './Login.css';

function Login({ onSubmit }) {
  const { values, handleChange, errors, isValid, resetForm } = useFormValidation({});
  const [isBlockForm, setIsBlockForm] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsBlockForm(true);
  };

  useEffect(() => {
    resetForm();
  }, [resetForm]);

  useEffect(() => {
    if (isBlockForm) {
      onSubmit({ email: values.email, password: values.password })
    }
    setIsBlockForm(false);
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [isBlockForm])

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
              disabled={isBlockForm && 'disabled'}
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
              disabled={isBlockForm && 'disabled'}
            />
            <span className='login__input-error login__input-error_last'>{errors.password}</span>
          </label>
          <button className={`login__button ${(!isValid || isBlockForm) ? 'login__button_disabled' : ''}`} type='submit'>
            {(isBlockForm) ? 'Авторизуемся...' : 'Войти'}
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
