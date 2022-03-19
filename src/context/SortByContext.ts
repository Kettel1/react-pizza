import {createContext, useContext} from "react";

export type TSortBy = {
    sort: {
        name: 'rating' | 'price',
        params: 'asc' | 'desc',
    },
    setSort: (typeSort: {name:'rating' | 'price', params: 'asc' | 'desc'}) => void
}

export const SortByContext = createContext<TSortBy>({
    sort: {
        name: 'rating',
        params: 'asc'
    },
    setSort: () => {},
})

export const useSort = () => useContext(SortByContext)
