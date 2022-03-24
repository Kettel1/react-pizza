import {Dispatch, SetStateAction} from "react";

export interface IPizza {
    id: number,
    name: string,
    imageUrl: string,
    types: Array<number>,
    sizes: Array<number>,
    price: number,
    category: number,
    rating: number
}

export interface ISort {
    sort: string,
    setSort: Dispatch<SetStateAction<string>>
}
