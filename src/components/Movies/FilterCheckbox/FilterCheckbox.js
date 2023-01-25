import './FilterCheckbox.css';

export default function FilterCheckbox({
  handleChangeCheckbox,
  checkboxState,
}) {
  return (
    <div className='filter-checkbox'>
      <input
        type='checkbox'
        className='filter-checkbox__button'
        id='filter'
        onChange={handleChangeCheckbox}
        checked={checkboxState}
      />
      <label htmlFor='filter' className='filter-checkbox__checkbox-name'>
        Короткометражки
      </label>
    </div>
  );
}
