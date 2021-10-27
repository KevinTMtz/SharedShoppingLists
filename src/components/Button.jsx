import React from 'react';

const Button = (props) => (
  <button className={props.type} onClick={props.onClick}>
    {props.children}
  </button>
);

export default Button;
