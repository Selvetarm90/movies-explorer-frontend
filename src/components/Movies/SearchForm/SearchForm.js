import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

export default function SearchForm() {
  return (
    <form className='search-form'>
      <input type='text' className='search-form__input' required placeholder='Фильм' />
      <button className='search-form__button' type='submit'>
        Найти
      </button>
      <FilterCheckbox />
    </form>
  );
}
