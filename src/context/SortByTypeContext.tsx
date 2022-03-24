import {createContext, ReactNode, useContext, useState} from "react";

export interface IUseSort {
    sort: {
        name: string,
        params: string
    },
    setSort: (typeSort: { name: string, params: string }) => void
}

export type TSortProviderProps = { children: ReactNode }

export type TState = {
    name: string,
    params: string,
}

export const SortByTypeContext = createContext<{
    sort: TState,
    setSort: (typeSort: TState) => void
} | undefined>(undefined)

export const SortByTypeProvider = ({children}: TSortProviderProps) => {
    const [sort, setSort] = useState({
        name: 'rating',
        params: 'asc'
    })

    const value = {sort, setSort}

    return (
        <SortByTypeContext.Provider value={value}>
            {children}
        </SortByTypeContext.Provider>
    )
}

export const useSort = () => {
    const context = useContext(SortByTypeContext)

    if (context === undefined) {
        console.log('useSort Error')
    }

    return context
}
