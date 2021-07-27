import React from 'react';
import classes from './Row.module.css';

const Row = (props) => {
  return (
    <div className={`${classes['row-container']} ${classes[props.className]}`}>
      {props.children}
    </div>
  );
};

export default Row;
