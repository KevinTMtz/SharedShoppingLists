import React from 'react';

const ListCell = (props) => (
  <div className='list-cell' onClick={props.onClick}>
    {props.children}
  </div>
);

export default ListCell;
