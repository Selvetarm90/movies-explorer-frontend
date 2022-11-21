import { useEffect, useRef } from 'react';
import './FilterCheckbox.css';

export default function FilterCheckbox({ handleChangeCheckbox, checkboxState, handleClickCheckbox }) {
  return (
    <div className='filter-checkbox'>
      <input
        type='checkbox'
        className='filter-checkbox__button'
        id='filter'
        onChange={handleChangeCheckbox}
        onClick={handleClickCheckbox}
        checked={checkboxState}
      />
      <label htmlFor='filter' className='filter-checkbox__checkbox-name'>
        Короткометражки
      </label>
    </div>
  );
}
