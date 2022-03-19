import {createContext, ReactNode, useContext, useReducer} from "react";
import {IPizza} from "../types/PizzaTypes";

type TAction =
    | { type: 'ADD_PIZZA_TO_CART', pizza: any }
    | { type: 'DELETE_PIZZA_FROM_CART', id: number }
    | { type: 'FILTER_PIZZAS_IN_CART_BY_ID', id: number }
type TDispatch = (action: TAction) => void
type TState = IPizza[]
type TCartProviderProps = { children: ReactNode }

export const CartContext = createContext<{
    state: TState,
    dispatch: TDispatch
} | undefined>(undefined)

const countReducer = (state: TState, action: TAction) => {
    switch (action.type) {
        case 'ADD_PIZZA_TO_CART': {
            return [
                ...state,
                action.pizza
            ]
        }

        case 'DELETE_PIZZA_FROM_CART': {
            return [
                ...state.filter((item: IPizza) => item.id !== action.id)
            ]
        }

        case 'FILTER_PIZZAS_IN_CART_BY_ID': {
            return [
                ...state.filter((item: IPizza) => item.id === action.id)
            ]
        }

        default: {
            return state
        }
    }
}

export const CartProvider = ({children}: TCartProviderProps) => {
    const [state, dispatch] = useReducer(countReducer, [])

    const value = {state, dispatch}
    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export const useTestCart = () => {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error('useCart error')
    }

    return context
}

