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
                <h3> <BsTelephoneFill /> Телефон</h3>
                <p>0888 88 88 88</p>
                <p>Ирина Папазова</p>
            </div>

            <div className={styles.footerCol}>
                <h3> <MdOutlineEmail /> Email</h3>
                <p>
                    <a href="mailto:sweetsurprises0810@gmail.com">sweetsurprises0810@gmail.com</a>
                </p>
            </div>

            <div className={styles.footerCol}>
                <h3> <MdOutlineMailOutline /> Последвайте ни</h3>
                <p style={{textAlign: 'center'}} onClick={() => goToInstagramPage()}>
                    <FaInstagram cursor="pointer" size={'40px'} />
                </p>
            </div>
        </footer>
    );
};

export default Footer;