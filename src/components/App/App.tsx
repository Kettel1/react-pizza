import React, {FC, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CartPage from "../../pages/CartPage";
import NotFound from "../../pages/NotFound";
import {PizzaStateContext} from "../../context/PizzaStateContext";
import {SortByContext} from "../../context/SortByContext";
import {getPizzaFromServer} from "../../services/api";
import {CartProvider} from "../../context/CartStateContext"

const App: FC = () => {
    // Sort State
    const [sort, setSort] = useState<{
        name: 'rating' | 'price',
        params: 'asc' | 'desc'
    }>({
        name: 'rating',
        params: 'asc'
    })
    const [categoryBy, setCategoryBy] = useState(null)

    //Pizza State
    const [loading, setLoading] = useState(false)
    const [pizza, setPizza] = useState([])

    useEffect(() => {
        getPizzaFromServer(sort,categoryBy)
            .then(response => response.json())
            .then(data => setPizza(data))
            .finally(() => setLoading(true))
    }, [sort])

    return (

        <PizzaStateContext.Provider value={{pizza, loading}}>
            <SortByContext.Provider value={{sort, setSort}}>
                <CartProvider>
                    <Routes>
                        <Route path='/' element={<HomePage/>}/>
                        <Route path='/cart' element={<CartPage/>}/>
                        <Route path='*' element={<NotFound/>}/>
                    </Routes>
                </CartProvider>
            </SortByContext.Provider>
        </PizzaStateContext.Provider>

    );
}

export default App;
