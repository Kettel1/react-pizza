import React, {FC, useEffect} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CartPage from "../../pages/CartPage";
import NotFound from "../../pages/NotFound";
import {TPizzaStateContext, usePizza} from "../../context/PizzaStateContext";
import {IUseSort, useSort} from "../../context/SortByTypeContext";
import {getPizzaFromServer} from "../../services/api";
import {ICategoryContext, useCategory} from "../../context/SortByCategoryContext";

const App: FC = () => {
    // Sort State
    const {sort} = useSort() as IUseSort
    const {category} = useCategory() as ICategoryContext

    //Pizza State
    const {setStatePizza, setLoading} = usePizza() as TPizzaStateContext

    useEffect(() => {
        setLoading(true)
        getPizzaFromServer(sort, category)
            .then(pizzas => setStatePizza(pizzas))
            .finally(() => setLoading(true))
    }, [sort, category])

    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
