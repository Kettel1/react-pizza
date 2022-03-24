import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
import {IPizza} from "../types/PizzaTypes";

export type TPizzaStateProps = { children: ReactNode }

export type TPizzaStateContext = {
    statePizza: IPizza[],
    setStatePizza: Dispatch<SetStateAction<IPizza[]>>,
    loading: boolean,
    setLoading: (loading: boolean) => void,
    error: boolean,
    setError: (error: boolean) => void
}

export const PizzaStateContext = createContext<TPizzaStateContext | undefined>(undefined)


export const PizzaProvider = ({children}: TPizzaStateProps) => {
    const [statePizza, setStatePizza] = useState<IPizza[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    const value = {statePizza, setStatePizza, loading, setLoading, error, setError}

    return (
        <PizzaStateContext.Provider value={value}>
            {children}
        </PizzaStateContext.Provider>
    )
}

export const usePizza = () => {
    const context = useContext(PizzaStateContext)

    if (context === undefined) {
        console.log('usePizza Error')
    }

    return context
}
