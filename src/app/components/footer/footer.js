"use client"
import { MdOutlineMailOutline } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

import styles from './footer.module.css';

const Footer = () => {

    const goToInstagramPage = () => {
        window.open('https://www.instagram.com/sweetsurprises70/', '_blank')
    }

    return (
        <footer id={styles.footer}>
            <div className={styles.footerCol}>
                <h3> <IoLocationSharp /> Адрес</h3>
                <p>София - Любляна 21а</p>
            </div>

            <div className={styles.footerCol}>
                <h3 > <BsTelephoneFill /> Апаратни процедури за тяло и солариум</h3>
                <p>
                    <a href='tel:+359877717006' style={{ textDecoration: 'none', color: 'inherit' }}>
                        0877 71 70 06
                    </a> -
                    Рени Папазова
                </p>
                <p>
                    <a href='tel:+359877894656' style={{ textDecoration: 'none', color: 'inherit' }}>
                        0877 89 46 56
                    </a> -
                    Антоанета Младенова
                </p>
            </div>

            <div className={styles.footerCol}>
                <h3> <BsTelephoneFill /> Масажист - терапевт</h3>
                <p>
                    <a href='tel:+359877097579' style={{ textDecoration: 'none', color: 'inherit' }}>
                        0877 09 75 79
                    </a> -
                    Симеон Иванов
                </p>
            </div>

            <div className={styles.footerCol}>
                <h3> <BsTelephoneFill /> Маникюр и педикюр</h3>
                <p>
                    <a href='tel:+359879272207' style={{ textDecoration: 'none', color: 'inherit' }}>
                        0879 27 22 07
                    </a> -
                    Добринка Симова
                </p>
            </div>

            <div className={styles.footerCol}>
                <h3> <MdOutlineEmail /> Email</h3>
                <p>
                    <a href="mailto:sweetsurprises@abv.bg" style={{ color: 'inherit' }}>sweetsurprises@abv.bg</a>
                </p>
            </div>

            <div className={styles.footerCol}>
                <h3> <MdOutlineMailOutline /> Последвайте ни</h3>
                <p onClick={() => goToInstagramPage()}>
                    <FaInstagram cursor="pointer" size={'40px'} />
                </p>
            </div>
        </footer>
    );
};

export default Footer;