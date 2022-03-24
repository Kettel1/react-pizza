import React, {ReactNode, useState, FC, ChangeEvent} from 'react';
import styles from './Content.module.scss'
import useComponentVisible from "../../hooks/useComponentVisible";
import {TPizzaStateContext, usePizza} from "../../context/PizzaStateContext";
import {IUseSort, useSort} from "../../context/SortByTypeContext";
import PizzaBlock from "../PizzaBlock/PizzaBlock";
import {IPizza} from "../../types/PizzaTypes";
import {ICategoryContext, useCategory} from "../../context/SortByCategoryContext";
import PizzaBlockSkeleton from "../PizzaBlock/PizzaBlockSkeleton";

type TTab = | 'all' | 'meat' | 'vegan' | 'bbq' | 'hot' | 'closed'

const Tab: FC<{
    children: ReactNode,
    value: string;
    onClick: (e: any) => void,
    active: boolean
}> = ({value, onClick, active, children}) => {
    return (
        <li data-value={value}
             className={!active ? styles.categoriesItem : styles.categoriesItemActive}
             onClick={onClick}
        >
            {children}
        </li>
    )
}

const SortByCategories = () => {
    const {category, setCategory} = useCategory() as ICategoryContext
    const [currentTab, setCurrentTab] = useState<TTab>('all')
    const {setLoading, setStatePizza} = usePizza() as TPizzaStateContext

    const onClick = (e: ChangeEvent<HTMLLIElement>) => {
        const currentCategory = e.target.dataset.value

        if (category !== currentCategory && currentCategory) {
            setCategory(currentCategory)
            setLoading(true)
            setStatePizza([])
        }
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

const SortByType: FC = () => {
    const {sort, setSort} = useSort() as IUseSort
    const {setStatePizza} = usePizza() as TPizzaStateContext
    const {ref, isComponentVisible, setIsComponentVisible} = useComponentVisible(false)

    const toggleDropdown = (): void => {
        setIsComponentVisible(!isComponentVisible)
    }

    const toggleSort = (value: 'rating' | 'price') => {
        setStatePizza([])
        if (value === sort.name) {
            setSort({
                name: value,
                params: sort.params === 'asc' ? 'desc' : 'asc'
            })
        } else {
            setSort({
                name: value,
                params: 'asc'
            })
        }
        setIsComponentVisible(false)
    }

    return (
        <div className={styles.sortContainer} ref={ref}>
            <p className={styles.sort}>
                <span>Сортировка по:</span>
                <span className={styles.sortTag} onClick={toggleDropdown}>
                    {sort.name === 'rating' ? 'популярности' : 'цене'}
                    <span className={sort.params === 'asc' ? styles.sortArrowRotated : styles.sortArrow}/>
                </span>
            </p>

            {
                isComponentVisible
                    ?
                    <ul className={styles.sortList}>
                        <li className={styles.sortItem} onClick={() => toggleSort('rating')}>
                            <span>
                                популярности
                            </span>
                        </li>
                        <li className={styles.sortItem} onClick={() => toggleSort('price')}>
                            <span>цене</span>
                        </li>
                    </ul>
                    :
                    null
            }
        </div>
    )
}

const Content = () => {
    const {statePizza, loading} = usePizza() as TPizzaStateContext

    return (
        <>
            <section className={styles.contentContainer}>
                <SortByCategories/>
                <SortByType/>
            </section>
            <h2>Все пиццы</h2>
            <section className={styles.pizzaContainer}>
                {statePizza.length >= 1 && loading ? statePizza.map((item: IPizza) => {
                        return (
                            <PizzaBlock
                                key={item.id}
                                imageUrl={item.imageUrl}
                                name={item.name}
                                sizes={item.sizes}
                                price={item.price}
                                types={item.types}
                                id={item.id}
                            />
                        )
                    }) :
                    Array.from(Array(8).keys()).map((item) => <PizzaBlockSkeleton key={item}/>)
                }
            </section>
        </>
    );
};

export default Content;
