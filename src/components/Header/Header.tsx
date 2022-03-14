import React, {FC} from 'react';
import Logo from '../../assets/svg/Logo.svg'
import shoppingCart from '../../assets/svg/shopping-cart.svg'
import styles from './Header.module.scss'
import {Link} from "react-router-dom";

const Header: FC = () => {
    return (
        <header className={styles.header}>

            <section className={styles.headerContainer}>
                <img src={Logo} alt={'Logo'} height='48' width='38'/>
                <div className={styles.titleContainer}>
                    <h1 className={styles.title}>React Pizza</h1>
                    <p className={styles.subTitle}>самая вкусная пицца во вселенной</p>
                </div>
            </section>

            <section className={styles.cartContainer}>
                <Link to='/cart' className={styles.cartLink}>
                    <span>520 ₽</span>
                    <span className={styles.cartLine}/>
                    <span className={styles.cartTotalCountContainer}>
                        <img src={shoppingCart} alt='/' width='16' height='16' />
                        <span>3</span>
                    </span>
                </Link>
            </section>

        </header>
    );
};

export default Header;
