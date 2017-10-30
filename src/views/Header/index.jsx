import React from 'react';

import { NavLink } from 'react-router-dom';

import styles from './header.module.css';
import cn from '../../utils/classname';

const Header = () =>
  <div className={cn(styles.header)}>
    <nav className={cn(styles.nav)}>
      <NavLink exact className={cn(styles.link)} activeClassName={cn(styles.selected)} to="/"> Home </NavLink>
      <NavLink exact className={cn(styles.link)} activeClassName={cn(styles.selected)} to="/gifview"> Gif View </NavLink>
    </nav>
  </div>;

export default Header;
