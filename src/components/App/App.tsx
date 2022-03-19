import React, {FC, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CartPage from "../../pages/CartPage";
import NotFound from "../../pages/NotFound";
import {PizzaStateContext} from "../../context/PizzaStateContext";
import {SortByContext} from "../../context/SortByContext";
import {IPizza} from "../../types/PizzaTypes";
import {getPizzaFromServer} from "../../services/api";

const App: FC = () => {
    const [sort, setSort] = useState('price')

    //Pizza State
    const [loading, setLoading] = useState(false)
    const [pizza, setPizza] = useState([])

    useEffect(() => {
        getPizzaFromServer()
            .then(response => response.json())
            .then(data => setPizza(data))
            .finally(() => setLoading(true))
    }, [])

    return (
        <PizzaStateContext.Provider value={{pizza, loading}}>
            <SortByContext.Provider value={{sort, setSort}}>
                <Routes>
                    <Route path='/' element={<HomePage/>}/>
                    <Route path='/cart' element={<CartPage/>}/>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </SortByContext.Provider>
        </PizzaStateContext.Provider>
    );
}

export default App;
