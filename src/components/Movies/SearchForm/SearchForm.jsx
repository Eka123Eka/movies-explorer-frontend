import findButton from '../../../images/find-button.svg'
import './SearchForm.css';

function SearchForm() {
  return (
    <div>
      <form className='search-form'>
        <div className='search-form__container'>
          <input className='search-form__input' name='search-movies' type='text' placeholder='Фильм' required/>
          <button className='search-form__submit-button' type='submit'>
            <img className='search-form__submit-icon' alt='Найти фильмы по ключевому слову' src={findButton} />
          </button>
        </div>
        <div className='search-form__checkbox'>
          <label className='search-form__checkbox-button'>
            <input className='search-form__checkbox-input' type='checkbox' />
            <span className='search-form__checkbox-switch'></span>
          </label>
          <p className='search-form__checkbox-title'>Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
