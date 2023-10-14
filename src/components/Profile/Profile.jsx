import { useEffect, useContext } from 'react';
import { CurrentUserContext, useFormValidation } from '../';
import { Link } from 'react-router-dom';
import { Header, AppContext } from '../';
import './Profile.css';

function Profile({ isLogIn, onLogOut, onUpdateUser }) {
  const { values, handleChange, errors, isValid, setValues } = useFormValidation({});
  const currentUser = useContext(CurrentUserContext);
  const { isLoading } = useContext(AppContext);

  useEffect(() => {
    setValues(currentUser);
  }, [setValues, currentUser]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({ name: values.name, email: values.email });
  }

  return (
    <>
      <Header isLogIn={isLogIn} />
      <section className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'>Привет, {currentUser.name}!</h2>
          <form className='profile__form' onSubmit={handleSubmit}>
            <label className='profile__label'>
              Имя
              <input className='profile__input'
                name='name'
                type='text'
                placeholder='смените имя'
                minLength='2'
                maxLength='100'
                required
                value={values.name || ''}
                onChange={handleChange}
                disabled={isLoading && 'disabled'}
              />
            </label>
            <p className="profile__input-error">{errors.name}</p>
            <label className='profile__label'>
              E-mail
              <input className='profile__input'
                name='email'
                type='email'
                placeholder='укажите новую почту'
                minLength='7'
                maxLength='100'
                autoComplete='off'
                required
                value={values.email || ''}
                onChange={handleChange}
                disabled={isLoading && 'disabled'}
              />
            </label>
            <p className="profile__input-error">{errors.email}</p>
            <div className='profile__footer'>
              <button className={`profile__edit-button
                ${(!isValid || isLoading || (values.name === currentUser.name && values.email === currentUser.email))
                  ? 'profile__edit-button_disabled'
                  : ''}`} type='submit'>
                {(isLoading) ? 'Профиль обновляется...' : 'Редактировать'}
              </button>
              <Link className='profile__quit-link' to='/' onClick={onLogOut}>Выйти из аккаунта</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
