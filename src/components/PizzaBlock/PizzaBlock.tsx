import React, {FC, useCallback, useState} from 'react';
import styles from './PizzaBlock.module.scss'
import AddButton from "../AddButton/AddButton";
import {useCart} from "../../context";
import {motion} from "framer-motion";


const availableTypes: any = {
    0: 'тонкое',
    1: 'традиционное'
}
const availableSizes = [26, 30, 40];


const PizzaBlock: FC<{
    imageUrl: string,
    name: string,
    types: Array<number>,
    sizes: Array<number>,
    price: number
    id: number,
}> = ({
          imageUrl,
          name,
          types,
          sizes,
          price,
          id,
      }) => {
    const [activeTypes, setActiveTypes] = useState(0)
    const [activeSize, setActiveSize] = useState(0)
    const [pizzaPrice, setPizzaPrice] = useState(price)
    const {dispatch, getCountPizzaById} = useCart()

    const onChangeSize = (index: number): void => {
        setActiveSize(index)

        // за 30 см доплата 60 рублей
        // за 40 см доплата 120 рублей
        if (index === 0) {
            setPizzaPrice(price)
        } else if (index === 1) {
            setPizzaPrice(price + 60)
        } else if (index === 2) {
            setPizzaPrice(price + 120)
        }
    }
    const onChangeType = (index: number): void => {
        setActiveTypes(index)
    }

    const onAddPizza = useCallback(() => {
        const pizza = {
            id,
            name,
            imageUrl,
            price: pizzaPrice,
            types: availableTypes[activeTypes],
            sizes: availableSizes[activeSize],
        };

        setActiveSize(0);
        setActiveTypes(0);
        dispatch({type: 'ADD_PIZZA_TO_CART', pizza});
    }, [activeSize, activeTypes])


    return (
        <article className={styles.container}>
            <img src={imageUrl} height='260' width='260' alt='name'/>
            <h2 className={styles.name}>{name}</h2>

            <div className={styles.infoContainer}>
                <ul className={styles.categoriesList}>
                    {types.map((type, index) => {
                        return (
                            <motion.li
                                key={type}
                                onClick={() => {
                                    types.includes(type) && onChangeType(index)
                                }}
                            >
                                {activeTypes === index && <motion.div layoutId={`activeType${id}`}/>}
                                <span>{availableTypes[type]}</span>
                            </motion.li>
                        )
                    })
                    }
                </ul>

                <ul className={styles.categoriesList}>
                    {sizes.map((size, index) => {
                        return (
                            <motion.li
                                key={size}
                                onClick={() => {
                                    sizes.includes(size) && onChangeSize(index)
                                }}
                            >
                                {activeSize === index && <motion.div layoutId={`activeSize${id}`}/>}
                                <span>{size + ' см.'}</span>
                            </motion.li>
                        )
                    })
                    }
                </ul>
            </div>

            <section className={styles.cartContainer}>
                <h3>от {pizzaPrice} ₽</h3>
                <AddButton onClick={onAddPizza}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                            fill="#EB5A1E"/>
                    </svg>
                    Добавить
                    {getCountPizzaById(id) === 0 ? null : <span>{getCountPizzaById(id)}</span>}
                </AddButton>
            </section>

        </article>
    );
};

export default PizzaBlock;
