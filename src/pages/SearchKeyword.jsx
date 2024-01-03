import React, { useState } from 'react';
import Master from '../component/Master';
import ProductList from '../component/ProductList';
const SearchKeyword = () => {
    const [data, setData] = useState([])
    return (
        <div>
            <Master>
                <ProductList/>
            </Master>
        </div>
    );
};

export default SearchKeyword;