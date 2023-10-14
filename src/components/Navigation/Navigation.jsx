import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { usePopupClose } from '../';
import imgButtonMenu from '../../images/header_menu-button.svg';
import imgButtonClose from '../../images/close-button.svg';
import './Navigation.css';

function Navigation({ isMainPage }) {
  const [isOpenPopupMenu, setIsOpenPopupMenu] = useState(false);

  const togglePopupMenu = () => {
    setIsOpenPopupMenu(!isOpenPopupMenu);
  };

  usePopupClose(isOpenPopupMenu, togglePopupMenu);

  return (
    <div className='navigation'>
      <div className='navigation__group'>
        <nav className={`navigation__popup ${isOpenPopupMenu ? 'navigation__popup_open' : ''}`}>
          <div className='navigation__links'>
            {isOpenPopupMenu &&
              (<NavLink to='/' className={({ isActive }) => isActive
                ? 'navigation__link navigation__link_visible navigation__link_active'
                : 'navigation__link navigation__link_visible'} >
                Главная
              </NavLink>)
            }
            <NavLink to='/movies' className={({ isActive }) => isActive
              ? 'navigation__link navigation__link_active'
              : 'navigation__link'} >
              Фильмы
            </NavLink>
            <NavLink to='/saved-movies' className={({ isActive }) => isActive
              ? 'navigation__link navigation__link_active'
              : 'navigation__link'} >
              Сохранённые фильмы
            </NavLink>
          </div>
          <Link to='/profile' className={isMainPage
            ? 'navigation__link navigation__profile navigation__profile_main-page'
            : 'navigation__link navigation__profile'}>
            Аккаунт
          </Link>
        </nav>
      </div>
      <button className={`${isOpenPopupMenu ? 'navigation__close-button' : 'navigation__menu-button'}
        ${isMainPage && !isOpenPopupMenu ? 'navigation__menu-button_main-page' : ''}`}
        aria-label='открыть меню действий'
        onClick={togglePopupMenu}
        type='button'>
        {isOpenPopupMenu
          ? <img className='navigation__close-image' alt='закрыть меню' src={imgButtonClose} />
          : <img className='navigation__menu-image' alt='открыть меню' src={imgButtonMenu} />
        }
      </button>
      <div className={`navigation__overlay ${isOpenPopupMenu ? 'navigation__overlay_open' : ''}`}
        onClick={togglePopupMenu}>
      </div>
    </div>
  );
}

export default Navigation;
