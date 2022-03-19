import {createContext, useContext} from "react";

export type TSortBy = {
    sort: string,
    setSort: (c: string) => void
}

export const SortByContext = createContext<TSortBy>({
    sort: 'popular',
    setSort: () => {},
})

export const useSort = () => useContext(SortByContext)
