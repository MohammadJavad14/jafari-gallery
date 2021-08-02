import React from 'react';
import classes from './Loader.module.css';
const Loader = (props) => {
  return (
    <div className={classes['loader-container']}>
      <div className={classes.loader}></div>
      <h3>{props.children}</h3>
    </div>
  );
};

export default Loader;
