import './FilterCheckbox.css';

export default function FilterCheckbox() {
  return (
    <div className='filter-checkbox'>
      <input type='checkbox' className='filter-checkbox__button' id='filter' />
      <label htmlFor='filter' className='filter-checkbox__checkbox-name'>
        Короткометражки
      </label>
    </div>
  );
}
