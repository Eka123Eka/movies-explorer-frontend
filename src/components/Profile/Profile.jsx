import { Link } from 'react-router-dom';
import { Header } from '../';
import './Profile.css';

function Profile ({isLogIn}) {
  return (
    <>
      <Header isLogIn={isLogIn}/>
      <section className='profile'>
        <div className='profile__container'>
          <h2 className='profile__title'>Привет, Виталий!</h2>
          <form className='profile__form'>
            <label className='profile__label'>
              Имя
              <input className='profile__input'
                     name='name'
                     type='text'
                     placeholder='Виталий'
                     minLength='2'
                     maxLength='100'
                     required
              />
            </label>
            <label className='profile__label'>
              E-mail
              <input className='profile__input'
                     name='email'
                     type='email'
                     placeholder='pochta@yandex.ru'
                     minLength='7'
                     maxLength='100'
                     autoComplete='off'
                     required
              />
            </label>
            <div className='profile__footer'>
              <button className='profile__edit-button' type='submit'>Редактировать</button>
              <Link className='profile__quit-link' to='/signin' >Выйти из аккаунта</Link>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

export default Profile;
