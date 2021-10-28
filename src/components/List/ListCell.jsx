import React from 'react';

const ListCell = (props) => (
  <div className='list-cell-and-check'>
    <div className='list-cell' onClick={props.onClick}>
      {props.children}
    </div>
    {props.hasCheckbox && (
      <label className='container'>
        <input
          type='checkbox'
          onChange={props.onChangeCheckbox}
          checked={props.checked}
        ></input>
        <span className='checkmark'></span>
      </label>
    )}
  </div>
);

export default ListCell;
