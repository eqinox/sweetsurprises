"use client"
import React from 'react';
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlinePhoneIphone } from "react-icons/md";
import { IoMailOutline } from "react-icons/io5";

import styles from './page.module.css';
import Map from './map';

const Contacts = () => {
    return <div className={styles.mainParent}>
        {/* <div className={styles.leftSide}>
  </div> */}

        <div className={styles.container}>
            <h2>Контакти</h2>

            <div className={styles.icons}>
                <IoLocationSharp size={40} />
            </div>
            <p style={{ marginBottom: '50px' }}>
                София - Овча Купел, Любляна 21а
            </p>

            <div className={styles.icons}>
                <MdOutlinePhoneIphone size={40} />
            </div>
            <p style={{ marginTop: '5px', color: 'burlywood' }}>Апаратни процедури за тяло и солариум</p>
            <p style={{ marginBottom: '5px' }}>
                <a href='tel:+359877717006' style={{ textDecoration: 'none', color: 'inherit' }}>
                    0877 71 70 06
                </a> -
                Рени Папазова
            </p>
            <p style={{ marginBottom: '50px' }}>
                <a href='tel:+359877894656' style={{ textDecoration: 'none', color: 'inherit' }}>
                    0877 89 46 56
                </a> - Антоанета Младенова
            </p>


            <div className={styles.icons}>
                <MdOutlinePhoneIphone size={40} />
            </div>
            <p style={{ marginTop: '5px', color: 'burlywood' }}>Масажист - терапевт</p>
            <p style={{ marginBottom: '50px' }}>
                <a href='tel:+359877097579' style={{ textDecoration: 'none', color: 'inherit' }}>
                    0877 09 75 79
                </a> -
                Симеон Иванов
            </p>

            <div className={styles.icons}>
                <MdOutlinePhoneIphone size={40} />
            </div>
            <p style={{ marginTop: '5px', color: 'burlywood' }}>Маникюр и педикюр</p>
            <p style={{ marginBottom: '50px' }}>
                <a href='tel:+359879272207' style={{ textDecoration: 'none', color: 'inherit' }}>
                    0879 27 22 07
                </a> - 
                Добринка Симова
                </p>

            <div className={styles.icons}>
                <IoMailOutline size={40} />
            </div>

            <p style={{ marginBottom: '60px' }}>
                <a style={{ color: 'white', textDecoration: 'none' }} href="mailto:sweetsurprises@abv.bg">sweetsurprises@abv.bg</a>
            </p>

        </div>

        <Map />

        {/* <div className={styles.rightSide}>
  </div> */}
    </div>;
};

export default Contacts;
