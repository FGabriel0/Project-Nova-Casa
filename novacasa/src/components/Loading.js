import React from 'react';
import style from './Loading.module.css';

const Loading = () => {
  return (
    <div className={style['loading-container']}>
      <div className={style['loading-spinner']}></div>
    </div>
  )
};

export default Loading;