import React, {FC} from 'react';
import Header from "../components/Header/Header";
import Container from "../components/Container/Container";
import Content from "../components/Content/Content";

const HomePage: FC = () => {
    return (
        <Container>
            <Header/>
            <Content/>
        </Container>
    );
};

export default HomePage;
