import React from 'react';
import classes from './Message.module.css';
const Message = ({ children, variant = 'info' }) => {
  return (
    <div className={`${classes.container} ${classes[variant]}`}>
      <div>{children}</div>
    </div>
  );
};

export default Message;
