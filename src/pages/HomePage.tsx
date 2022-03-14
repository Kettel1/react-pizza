import React, {FC} from 'react';
import {Link} from "react-router-dom";
import styles from './HomePage.module.scss'
import Header from "../components/Header/Header";

const HomePage: FC = () => {
    return (
        <section className={styles.container}>
            <Header/>
        </section>
    );
};

export default HomePage;
