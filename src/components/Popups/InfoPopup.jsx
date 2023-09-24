
import Popup from './Popup';
import { AppContext } from '../';
import { useContext } from 'react';
import successRegImage from '../../images/success_registration.svg';
import failureRegImage from '../../images/failure_registration.svg';
import './InfoPopup.css'
function InfoPopup({ isOpen, onClose, isSuccess }) {
  const {serverError} = useContext(AppContext);
  return (
    <>
      <Popup isOpen = {isOpen} name = 'info-tooltip' onClose = {onClose}>
        <div className='popup__container popup__container_type_tooltip'>
          <button className='popup__button-close' type='button' aria-label='Закрыть форму' onClick={onClose}></button>
          <img className='popup__picture-tooltip' src={isSuccess ? successRegImage : failureRegImage}
            alt={isSuccess ? 'Успешно.' : 'Неудачно.'} />
          {isSuccess
            ? <>
              <p className='popup__title-tooltip'>{serverError}</p>
            </>
            : <>
              <p className='popup__title-tooltip'>{serverError}</p>
            </>
          }
        </div>
      </Popup>
    </>
  )
}

export default InfoPopup;
