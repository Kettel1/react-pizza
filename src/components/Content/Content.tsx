import React, {ReactNode, useState, FC, ChangeEvent, useContext, useEffect} from 'react';
import styles from './Content.module.scss'
import useComponentVisible from "../../hooks/useComponentVisible";
import useCart from "../../hooks/useCart";
import {PizzaStateContext, usePizza} from "../../context/PizzaStateContext";
import {SortByContext, useSort} from "../../context/SortByContext";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import {IPizza, ISort} from "../../types/PizzaTypes";

const Tab: FC<{
    children: ReactNode,
    value: string;
    onClick: (e: any) => void,
    active: boolean
}> = ({value, onClick, active, children}) => {
    return (
        <li data-value={value} className={!active ? styles.categoriesItem : styles.categoriesItemActive}
            onClick={onClick}>
            {children}
        </li>
    )
}

const Categories = () => {
    type TTab = | 'all' | 'meat' | 'vegan' | 'bbq' | 'hot' | 'closed'

    const [currentTab, setCurrentTab] = useState<TTab>('all')

    const onClick = (e: ChangeEvent<HTMLLIElement>) => {
        setCurrentTab(e.target.dataset.value as TTab)
    }

    return (
        <ul className={styles.categoriesList}>
            <Tab value='all' onClick={onClick} active={currentTab === 'all'}>
                Все
            </Tab>
            <Tab value='meat' onClick={onClick} active={currentTab === 'meat'}>
                Мясные
            </Tab>
            <Tab value='vegan' onClick={onClick} active={currentTab === 'vegan'}>
                Вегетарианская
            </Tab>
            <Tab value='bbq' onClick={onClick} active={currentTab === 'bbq'}>
                Гриль
            </Tab>
            <Tab value='hot' onClick={onClick} active={currentTab === 'hot'}>
                Острые
            </Tab>
            <Tab value='closed' onClick={onClick} active={currentTab === 'closed'}>
                Закрытые
            </Tab>
        </ul>
    )
}

const SortByType:FC = () => {
    const {sort, setSort} = useSort()
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const toggleDropdown = (): void => {
        setIsComponentVisible(!isComponentVisible)
    }

    const toggleSort = (value: string) => {
        setSort(value)
        setIsComponentVisible(false)
    }

    return (
        <div className={styles.sortContainer} ref={ref}>
            <p className={styles.sort}>
                Сортировка по: <span className={styles.sortTag} onClick={toggleDropdown}>{sort === 'popular' ? 'популярности' : 'цене'}</span>
            </p>

            {
                isComponentVisible
                    ?
                    <ul className={styles.sortList}>
                        <li className={styles.sortItem} onClick={() => toggleSort('popular')}>популярности</li>
                        <li className={styles.sortItem} onClick={() => toggleSort('price')}>цене</li>
                    </ul>
                    :
                    null
            }
        </div>
    )
}


const Content = () => {
    const {cart, addPizzaToCart, findCurrentPizza, deletePizzaFromCart, filterPizzasInCartById} = useCart()
    const {pizza, loading} = usePizza()

    return (
        <>
            <section className={styles.contentContainer}>
                <Categories/>
                <SortByType/>
            </section>
            <section className={styles.pizzaContainer}>
                {pizza.length && loading && pizza.map((item: IPizza) => {
                    return (
                        <PizzaBlock
                            key={item.id}
                            imageUrl={item.imageUrl}
                            name={item.name}
                            sizes={item.sizes}
                            price={item.price}
                            types={item.types}
                            id={item.id}
                            addPizza={addPizzaToCart}
                            filterPizzas={filterPizzasInCartById}

                        />
                    )
                })}
            </section>
        </>
    );
};

export default Content;
