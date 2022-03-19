import {createContext, useContext} from "react";
import {IPizza, IPizzaStateContext} from "../types/PizzaTypes";

// export const PizzaStateContext = createContext<IPizzaStateContext | null>(null)


export type TPizzaStateContext = {
    pizza: IPizza[] | [],
    loading: boolean,
}

export const PizzaStateContext = createContext<TPizzaStateContext>({
    pizza: [],
    loading: false,
})

export const usePizza = () => useContext(PizzaStateContext)
