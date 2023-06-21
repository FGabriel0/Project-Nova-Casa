import React from 'react'
import style from './Sidebar.module.css'

const Sidebar = () => {
  return (
    <div className={style.sidebar}>
        <ul className={style.menu}>
            <li>Item:1</li>
            <li>Item:1</li>
            <li>Item:1</li>
        </ul>
    </div>
  )
}

export default Sidebar