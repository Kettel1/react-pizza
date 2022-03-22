import React from 'react';
import {Link} from "react-router-dom";
import {useCart} from "../context";
import Container from "../components/Container/Container";
import PizzaBlockSkeleton from "../components/PizzaBlock/PizzaBlockSkeleton";

const CartPage = () => {
    const {state} = useCart()

    console.log(state)
    return (
        <Container>
            <Link to='/'>Home</Link>
            <PizzaBlockSkeleton/>
        </Container>
    );
};

export default CartPage;
