export interface IPizzaStateContext {
    pizza: any,
    loading: boolean
}

export interface IPizza {
    id: number,
    imageUrl: string,
    types: Array<number>,
    sizes: Array<number>,
    price: number,
    category: number,
    ratting: number
}
