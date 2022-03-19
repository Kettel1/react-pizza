export const getPizzaFromServer = async () => {
    return await fetch('http://localhost:4000/pizzas')
}
