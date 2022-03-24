export const getPizzaFromServer = async (sortParams: { name: string, params: string }, categoryBy: string | undefined) => {

    const category = categoryBy === 'all' ? '' : `&category=${categoryBy}`
    try {
        const requestPizzaFromServer = await fetch(`http://localhost:4000/pizzas?_sort=${sortParams.name}&_order=${sortParams.params}${category}`);
        if (requestPizzaFromServer.ok) {
            return requestPizzaFromServer.json()
        }
    } catch (e) {
        console.log(e)
    }

}
