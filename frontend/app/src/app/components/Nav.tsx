import Link from 'next/link';
import React from 'react';
import styles from './Nav.module.css';

const Nav: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navItem}><Link href="/">Home</Link></li>
        <li className={styles.navItem}><Link href="/new-booking">New Booking</Link></li>
      </ul>
    </nav>
  );
};

export default Nav;