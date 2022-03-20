import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import {BrowserRouter} from "react-router-dom";
import './index.scss'
import {
    SortByTypeProvider,
    CartProvider,
    PizzaProvider,
    SortByCategoryProvider
} from "./context";


ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <SortByTypeProvider>
                <SortByCategoryProvider>
                    <CartProvider>
                        <PizzaProvider>
                            <App/>
                        </PizzaProvider>
                    </CartProvider>
                </SortByCategoryProvider>
            </SortByTypeProvider>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);
