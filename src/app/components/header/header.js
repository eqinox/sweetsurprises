"use client"
import { useEffect, useState } from 'react';
import Navbar from "./navbar";
import styles from "./header.module.css";
import Image from 'next/image';

const Header = () => {
    const logoId = 1;
    const headerId = 1;
    const headingItems = ["home", "about-us", "gallery", 'contacts'];

    const [logo, setLogo] = useState('');
    const [headerImage, setHeaderImage] = useState('');

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const headerResponse = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/headers/${headerId}?populate=*`);
                const headerData = await headerResponse.json();
                const imageUrl = headerData.data.attributes.image.data.attributes.formats.medium.url;
                setHeaderImage(imageUrl);

                const logoResponse = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/logos/${logoId}?populate=*`);
                const logoData = await logoResponse.json();
                const logoPath = process.env.NEXT_PUBLIC_DB_HOST + logoData.data.attributes.image.data.attributes.formats.thumbnail.url;
                setLogo(logoPath);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHeaderData();
    }, []);

    return (
        <header
            style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_DB_HOST}${headerImage})` }}
            className={styles.header}
        >
            <div className={`${styles.logo}`}>
                {logo && <Image
                    src={logo}
                    alt='Logo'
                    width={245} height={78}
                    style={{ width: '245px', height: '78px' }}
                />}
            </div>

            <Navbar
                className={styles.navbar}
                headingItems={headingItems}
            />
        </header>
    );
};

export default Header;
