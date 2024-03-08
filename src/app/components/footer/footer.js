"use client"
import { imageUrlBase } from '@/utils/helper';
import { IoLocationOutline } from "react-icons/io5";
import { BsTelephoneFill } from "react-icons/bs";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaInstagram } from "react-icons/fa";
import React, { useEffect, useState } from 'react';
import FooterSection from './footerSection';
import styles from './footer.module.css';
import Button from '../UI/button';

const Footer = () => {
    const footerId = 1;
    const [footerImage, setFooterImage] = useState('');
    useEffect(() => {
        const fetchFooterData = async () => {
            try {
                const headerResponse = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/footers/${footerId}?populate=*`);
                const footerData = await headerResponse.json();
                console.log('footer data', footerData);
                const imageUrl = imageUrlBase + footerData.data.attributes.image.data.attributes.url;
                setFooterImage(imageUrl);
            } catch (error) {
                console.log(error);
            }
        };

        fetchFooterData();
    }, []);

    const goToInstagramPage = () => {

    }

    return (
        <footer style={{
            backgroundColor: '#333',
            textAlign: 'center',
            height: '290px',
            // padding: '1rem 0',
            fontWeight: 'bold',
            width: '100%',
            backgroundImage: `url(${footerImage})`,
            display: 'flex', // Enable flexbox
            justifyContent: 'start', // Evenly space the child elements
            alignItems: 'center' // Center-align items vertically
        }}>
            <div style={{ flex: '1' }} className={styles.footerSection}>
                <FooterSection
                    icon={<IoLocationOutline />}
                    title={"Адрес"}
                    textArray={['София - Любляна 21а']} />
            </div>
            <div style={{ flex: '1' }} className={styles.footerSection}>
                <FooterSection
                    icon={<BsTelephoneFill />}
                    title={"Телефон"}
                    textArray={['0888888888', 'Рени Папазова']} />
            </div>
            <div style={{ flex: '1' }} className={styles.footerSection}>
                <FooterSection
                    icon={<MdOutlineMailOutline />}
                    title={"Email"}
                    textArray={['sweetsurprises@abv.bg']} />
            </div>
            <div style={{ flex: '1' }} className={styles.footerSection}>
                <FooterSection
                    icon={<MdOutlineMailOutline />}
                    title={"Последвайте ни"}
                    textArray={[
                        <FaInstagram onClick={() => goToInstagramPage()} size={'40px'} /> 
                    ]} />
            </div>
            <div style={{ flex: '2' }} className={styles.footerSection}>

            </div>
        </footer>
    );
};

export default Footer;