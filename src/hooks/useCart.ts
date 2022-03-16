import React, {useState} from 'react';
import {IPizza} from "../types/PizzaTypes";

const useCart = () => {
    const [cart, setCart] = useState<IPizza[]>([])

    const addPizzaToCart = (obj:IPizza) => {
        setCart((prevState:IPizza[]) => ([...prevState, obj]))
    }

    const deletePizzaFromCart = (pizzaId:number) => {
        setCart([...cart.filter(({id}) => {
            return id !== pizzaId
        })])
    }

    const filterPizzasInCartById = (pizzaId:number) => {
        return cart.filter((item) => item.id === pizzaId).length
    }

    const findCurrentPizza = (pizzas:IPizza[], id:number) => {
        return pizzas.filter((item) => item.id ===id)
    }

    return {cart, addPizzaToCart, deletePizzaFromCart, filterPizzasInCartById, findCurrentPizza}

};

export default useCart;
