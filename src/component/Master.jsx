import React from 'react';
import MenuBar from './Menu-Bar';
import Footer from './Footer';

const Master = (props) => {
    return (
        <>
         <MenuBar/>
            { props.children }
        <Footer/>
        </>
    );
};

export default Master;