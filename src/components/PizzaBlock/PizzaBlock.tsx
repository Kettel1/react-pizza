import React, {FC, useCallback, useContext, useEffect, useState} from 'react';
import styles from './PizzaBlock.module.scss'
import AddButton from "../AddButton/AddButton";
import {PizzaStateContext} from "../../context/PizzaStateContext";
import {IPizza, IPizzaStateContext} from "../../types/PizzaTypes";


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
    addPizza: any,
    filterPizzas: any,
}> =React.memo(({
          imageUrl,
          name,
          types,
          sizes,
          price,
          id,
          addPizza,
          filterPizzas,
      }) =>  {
    const [activeTypes, setActiveTypes] = useState(0)
    const [activeSize, setActiveSize] = useState(0)

    const onChangeSize = (index: number): void => {
        setActiveSize(index)
    }
    const onChangeType = (index: number): void => {
        setActiveTypes(index)
    }

    const onAddPizza = () => {
        const pizza = {
            id,
            name,
            imageUrl,
            price,
            types: availableTypes[activeTypes],
            sizes: availableSizes[activeSize],
        };

        setActiveSize(0);
        setActiveTypes(0);
        addPizza(pizza);
    }

    const countPizza = filterPizzas(id)

    return (
        <article className={styles.container}>
            <img src={imageUrl} height='260' width='260' alt='name'/>
            <h2 className={styles.name}>{name}</h2>

            <div className={styles.infoContainer}>
                <div className={styles.categoriesList}>
                    {types.map((type, index) => {
                        return (
                            <React.Fragment key={type}>
                                <input
                                    checked={activeTypes === index}
                                    type="radio"
                                    id={`type${index}`}
                                    value={type}
                                    name={'type'}
                                    disabled={!types.includes(type)}
                                    onChange={() => onChangeType(index)}
                                />
                                <label onClick={() => {
                                    if (types.includes(index)) {
                                        onChangeType(index)
                                    }
                                }} htmlFor={'type'}
                                >
                                    {availableTypes[type]}
                                </label>
                            </React.Fragment>
                        )
                    })}
                    <div style={{width: `${100 / types.length}%`}} className={styles.indicator}/>
                </div>

                <div className={styles.categoriesList}>
                    {availableSizes.map((size, index) => {
                        return (
                            <React.Fragment key={size}>
                                <input
                                    checked={activeSize === index}
                                    type="radio"
                                    id={`size${size}`}
                                    value={size}
                                    name={'size'}
                                    disabled={!sizes.includes(size)}
                                    onChange={() => onChangeSize(index)}
                                />
                                <label onClick={() => {
                                    if (sizes.includes(size)) {
                                        onChangeSize(index)
                                    }
                                }} htmlFor={'size'}>{size}</label>
                            </React.Fragment>
                        )
                    })}
                    <div style={{width: `${100 / availableSizes.length}%`}} className={styles.indicator}/>
                </div>
            </div>

            <section className={styles.cartContainer}>
                <h3>от {price} ₽</h3>
                <AddButton onClick={onAddPizza}>
                    Добавить
                    {countPizza === 0 ? null : <span>{countPizza}</span>}
                </AddButton>
            </section>

        </article>
    );
});

export default PizzaBlock;
