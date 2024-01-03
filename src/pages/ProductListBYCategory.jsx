import React from 'react';
import Master from '../component/Master';
import CategoryListbyid from '../component/CategoryListbyid';

const ProductListBYCategory = () => {
    return (
        <div>
            <Master>
                <CategoryListbyid/>
            </Master>
        </div>
    );
};

export default ProductListBYCategory;