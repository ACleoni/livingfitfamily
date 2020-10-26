import React, { useState, useEffect } from "react";
import styles from './Header.module.scss'
import Logo from '../../../public/Logo.svg'

export default function Header() {
    const [header, setHeader] = useState(styles.site__header_transparent)

    const listenScrollEvent = event => {
        if (window.scrollY < 73) {
            return setHeader(styles.site__header_transparent);
        } else if (window.scrollY > 70) {
            return setHeader(styles.site__header_opaque);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => window.removeEventListener("scroll", listenScrollEvent);
    }, []);

    return (
        <header className={header}>
            <div className={styles.grid}>
                <div className={styles.site__logo}>
                    <img src={Logo} />
                </div>
                <nav className={`${styles.navigation} ${styles.navigation__inline} ${styles.navigation__main}`}>
                    <ul>
                        <li><a href="#">About</a></li>
                        <li><a href="/#services">Services</a></li>
                        <li><a href="#">Merch</a></li>
                        <li><a href="/#contact">Contact</a></li>
                        <li><a href="#" className={`${styles.button} ${styles.button__primary} ${styles.button__rounded}`}>Log In</a></li>
                    </ul>
                </nav>
            </div>

        </header>
    )
};
