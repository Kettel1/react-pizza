import React, {FC, ReactNode} from 'react';
import styles from "../../pages/HomePage.module.scss";

const Container:FC<{children: ReactNode}> = ({children}) => {
    return (
        <section className={styles.container}>
            {children}
        </section>
    );
};

export default Container;
