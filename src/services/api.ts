export const getPizzaFromServer = async (sortParams: {name: 'rating' | 'price', params: 'asc' | 'desc'}, categoryBy: number | null) => {
    const category = categoryBy === null ? '' : `&category=${categoryBy}`

    return await fetch(`http://localhost:4000/pizzas?_sort=${sortParams.name}&_order=${sortParams.params}${category}`)
}
