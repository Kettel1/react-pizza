import React, {FC, useState} from 'react';
import styles from './PizzaBlock.module.scss'

const types = [0]
const sizes = [26, 30, 40]

const PizzaBlock: FC = () => {
    const availableTypes = ['тонкое', 'традиционное'];
    const availableSizes = [26, 30, 40];

    const [activeCategory, setActiveCategory] = useState(0)
    const [activeSize, setActiveSize] = useState(0)

    const onChangeSize = (index: number): void => {
        setActiveSize(index)
    }
    const onChangeType = (index: number): void => {
        setActiveCategory(index)
    }

    return (
        <article className={styles.container}>
            <img src='https://via.placeholder.com/260x260' height='260' width='260' alt='name'/>
            <h2 className={styles.name}>Чизбургер-Пицца</h2>

            <div className={styles.categoriesContainer}>
                <ul className={styles.categoriesList}>
                    {availableTypes.map((type, index) => {
                        const disabled = !types.includes(index) ? styles.categoriesItemNotActive : ''
                        const active = activeCategory === index ? styles.categoriesItemActive : ''

                        return (
                            <li onClick={() => onChangeType(index)} className={`${disabled} ${active}`}>
                                {type}
                            </li>
                        )
                    })}
                </ul>

                <ul className={styles.categoriesList}>
                    {availableSizes.map((item, index) => {
                        const disabled = !sizes.includes(item) ? styles.categoriesItemNotActive : ''
                        const active = activeSize === index ? styles.categoriesItemActive : ''

                        return (
                            <li onClick={() => onChangeSize(index)} className={`${disabled} ${active}`}>
                                {item}
                            </li>
                        )
                    })}
                </ul>
            </div>
        </article>
    );
};

export default PizzaBlock;
