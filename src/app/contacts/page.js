"use client"
import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";

import styles from './page.module.css';

const Contacts = () => {
  return <div className={styles.mainParent}>
  {/* <div className={styles.leftSide}>
  </div> */}

  <div className={styles.container}>
      <h2>Контакти</h2>

      <div className={styles.icons}>
          <IoLocationSharp size={40} />
      </div>
      <p>
          София - Овча Купел, Любляна 21а
      </p>

      <div className={styles.icons}>
          <MdOutlinePhoneIphone size={40} />
      </div>

      <p style={{ marginBottom: '5px' }}> 0876 43 44 64 </p>
      {/* <p style={{ marginTop: '5px', marginBottom: '5px' }}> 0899 43 44 61 </p> */}
      <p style={{ marginTop: '5px' }}> Ирина Папазова </p>

      <div className={styles.icons}>
          <IoMailOutline size={40} />
      </div>

      <p style={{ marginBottom: '60px' }}>
          <a style={{ color: 'white', textDecoration: 'none' }} href="mailto:sweetsurprises0810@gmail.com">sweetsurprises0810@gmail.com</a>
      </p>

  </div>

  {/* <div className={styles.rightSide}>
  </div> */}
</div>;
};

export default Contacts;
