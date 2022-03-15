import React, {FC, useEffect, useState} from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CartPage from "../../pages/CartPage";
import NotFound from "../../pages/NotFound";
import {PizzaState} from "../../context/PizzaState";

const App: FC = () => {
    const [loading, setLoading] = useState(false)
    const [pizza, setPizza] = useState(null)
    const getPizzaFromServer = async () => {
        return await fetch('http://localhost:4000/pizzas')
    }

    useEffect(() => {
        getPizzaFromServer()
            .then(response => response.json())
            .then(data => setPizza(data))
            .finally(() => setLoading(true))
    }, [])

    return (
        <PizzaState.Provider value={{pizza, loading}}>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/cart' element={<CartPage/>}/>
                <Route path='*' element={<NotFound/>}/>
            </Routes>
        </PizzaState.Provider>
    );
}

export default App;
