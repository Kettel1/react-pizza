import React from 'react';
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <Link to='/cart'>Cart</Link>
            HomePage
        </div>
    );
};

export default HomePage;
