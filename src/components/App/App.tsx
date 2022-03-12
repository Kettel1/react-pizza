import React from 'react';
import {Route, Routes} from "react-router-dom";
import HomePage from "../../pages/HomePage";
import CartPage from "../../pages/CartPage";
import NotFound from "../../pages/NotFound";

function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/cart' element={<CartPage/>}/>
            <Route path='*' element={<NotFound/>}/>
        </Routes>
    );
}

export default App;
