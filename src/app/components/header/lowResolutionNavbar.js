"use client"
import { usePathname } from "next/navigation";
import styles from "./lowResolutionNavbar.module.css";
import Link from 'next/link'

const LowResolutionNavbar = ({ className, headingItems, showDropdown, toggleMenuDropdown }) => {
    const pathname = usePathname()
    const url = pathname.replace('/', '')
console.log('showDropdown', showDropdown);
    return (
        <div>
            <div
                className={styles.backdrop + ` ${showDropdown === true ? styles.visible : styles.hidden}`}
                onClick={() => toggleMenuDropdown(false)}
            >
                <nav className={styles.dropdownMenu + ` ${showDropdown === true ? styles.visible + ' ' + styles.zIndex20 : styles.hidden}`}>
                    <ul>
                        {headingItems.map((item, index) => {
                            return (
                                <li className={styles.li} key={index}>
                                    <Link
                                        className={`${styles.navLink} ${item.toLowerCase() === url ? styles.selected : undefined}`}
                                        href={item.toLowerCase()}
                                    >
                                        {item}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </div>


    );
};

export default LowResolutionNavbar;
