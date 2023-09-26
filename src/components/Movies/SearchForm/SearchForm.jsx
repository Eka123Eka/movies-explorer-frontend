import { useState } from 'react';
import findButton from '../../../images/find-button.svg'
import { messages } from '../../';
import './SearchForm.css';

function SearchForm({ isChecked, searchText, onSubmitSearch, handleCheckBox}) {
  const [searchError, setSearchError] = useState('');
  const [textInput, setTextInput] = useState(searchText);
  const [checkboxInput, SetCheckboxInput] = useState(isChecked);

  const handleChange = (e) => {
    setTextInput(e.target.value);
    if (e.target.value && searchError !== '') {
      setSearchError('')
    } else if (!e.target.value && searchError === '') {
      setSearchError(messages.empty_query)
    }
  };

  function toggleCheckBox(e) {
    const withFilter = e.target.checked;
    handleCheckBox(withFilter, textInput);
    SetCheckboxInput(withFilter);
    if (textInput) {
      setSearchError('');
    } else {
      setSearchError(messages.empty_query);
    }
  }
  function submitSearch(e) {
    e.preventDefault();
    onSubmitSearch(textInput);
    if (textInput) {
      setSearchError('');
    } else {
      setSearchError(messages.empty_query);
    }
  }
  return (
    <div>
      <form className='search-form' onSubmit={submitSearch} noValidate>
        <div className='search-form__container'>
          <input
            className='search-form__input'
            name='search-movies'
            type='text'
            placeholder='введите ключевое слово для поиска'
            required
            value={textInput || ''}
            onChange={handleChange}/>
          <button className='search-form__submit-button' type='submit'>
            <img className='search-form__submit-icon' alt='Найти фильмы по ключевому слову' src={findButton} />
          </button>
        </div>
        <span className='search-form__span-error'>{searchError}</span>
        <div className='search-form__checkbox'>
          <label className='search-form__checkbox-button'>
            <input className='search-form__checkbox-input' type='checkbox' checked={checkboxInput} onChange={toggleCheckBox}/>
            <span className='search-form__checkbox-switch'></span>
          </label>
          <p className='search-form__checkbox-title'>Короткометражки</p>
        </div>
      </form>
    </div>
  );
}

export default SearchForm;
