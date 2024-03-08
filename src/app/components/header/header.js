"use client"
import { useEffect, useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import Navbar from "./navbar";
import styles from "./header.module.css";
import Image from 'next/image';
import LowResolutionNavbar from './lowResolutionNavbar';
import Button from '../UI/button';
import { imageUrlBase } from '@/utils/helper';

const Header = () => {
    const logoId = 1;
    const headerId = 1;
    const headingItems = ["home", "about-us", "gallery", 'contacts'];

    const [logo, setLogo] = useState('');
    const [headerImage, setHeaderImage] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const fetchHeaderData = async () => {
            try {
                const headerResponse = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/headers/${headerId}?populate=*`);
                const headerData = await headerResponse.json();
                const imageUrl = imageUrlBase + headerData.data.attributes.image.data.attributes.formats.medium.url;
                setHeaderImage(imageUrl);

                const logoResponse = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/logos/${logoId}?populate=*`);
                const logoData = await logoResponse.json();
                const logoPath = imageUrlBase + logoData.data.attributes.image.data.attributes.formats.thumbnail.url;
                setLogo(logoPath);
            } catch (error) {
                console.log(error);
            }
        };

        fetchHeaderData();
    }, []);

    const toggleMenuDropdown = (value) => {
        if (value === false) {
            setShowDropdown(value);
        } else {
            setShowDropdown(!showDropdown);
        }
    };

    return (
        <header
            style={{ backgroundImage: `url(${headerImage})` }}
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
            <LowResolutionNavbar
                showDropdown={showDropdown}
                toggleMenuDropdown={toggleMenuDropdown}
                headingItems={headingItems}
            />

            <Button
                onClick={() => toggleMenuDropdown()}
                className={styles["menu-icon"]}
            >
                <IoMdMenu size={45} />
            </Button>
        </header>
    );
};

export default Header;
