import {createContext, Dispatch, ReactNode, SetStateAction, useContext, useState} from "react";
export type TCategoryProviderProps = { children: ReactNode }

export interface ICategoryContext {
    category: string | undefined,
    setCategory: Dispatch<SetStateAction<string>>
}

export const SortByCategoryContext = createContext<ICategoryContext | undefined>(undefined)

export const SortByCategoryProvider = ({children}:TCategoryProviderProps) => {
    const [category, setCategory] = useState('all')

    const value = {category, setCategory}

    return (
        <SortByCategoryContext.Provider value={value}>
            {children}
        </SortByCategoryContext.Provider>
    )
}

export const useCategory = () => {
    const context = useContext(SortByCategoryContext)

    if(context === undefined) {
        console.log('useCategory Error')
    }

    return context
}
