"use client"
import { usePathname } from "next/navigation";
import styles from "./navbar.module.css";
import Link from 'next/link'

const Navbar = ({ className, headingItems, params }) => {
    const pathname = usePathname()
    const url = pathname.replace('/', '')
    
    return (
        <nav className={styles.links + ` ${className}`}>
            <ul>
                {headingItems.map((item, index) => {
                    return (
                        <li key={index}>
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
    );
};

export default Navbar;
