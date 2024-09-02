"use client"
import Navbar from "./navbar";
import styles from "./header.module.css";
import LowResolutionNavbar from './lowResolutionNavbar';
import Button from '../UI/button';

import { useState } from 'react';
import { IoMdMenu } from "react-icons/io";
import Image from 'next/image';
import { useRouter } from "next/navigation";

const Header = () => {
    const router = useRouter();

    const headingItems = [
        { title: 'Начало', route: '/' },
        { title: 'За нас', route: 'about-us' },
        { title: 'Галерия', route: 'gallery' },
        { title: 'Контакти', route: 'contacts' }
    ];

    const [showDropdown, setShowDropdown] = useState(false);

    const toggleMenuDropdown = (value) => {
        if (value === false) {
            setShowDropdown(value);
        } else {
            setShowDropdown(!showDropdown);
        }
    };

    return (
        <header
            style={{ backgroundImage: `url(header.jpg)` }}
            className={styles.header}
        >
            <div className={`${styles.logo}`} onClick={() => { router.push('/') }}>
                <Image
                    src="/logo.png"
                    alt='Logo'
                    width={245} height={78}
                    style={{ width: '245px', height: '78px' }}
                />
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
