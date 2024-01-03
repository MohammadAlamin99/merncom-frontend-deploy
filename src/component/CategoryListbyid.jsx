import React, { useEffect, useState } from 'react';
import { CategoryDetailsById } from '../apiRequest/ApiRequest';
import { Link, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const CategoryListbyid = () => {
    const [data_new, setData_new] = useState([]);
    let {categoryId} = useParams();

    useEffect(()=>{
        (async()=>{
            let result= await CategoryDetailsById(categoryId);
            setData_new(result);
        })([0])
    })
    return (
        <>
        <div className="container">
                    <div className="row">
                    {
                        data_new.length>0?(
                           
                            data_new.map((item,i)=>{

                                let price=<p className="bodyMedium  text-dark my-1">Price: ${item['price']} </p>
                                if(item['discount']===true){
                                    price=<p className="bodyMedium  text-dark my-1">Price: <strike>${item['price']}</strike> ${item['discountPrice']}</p>
                                }

                                return(
                                    <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12" key={i}>
                                        <Link to={"/details/"+item['_id']} className="card shadow-sm h-100 rounded-3 bg-white">
                                            <img className="w-100 rounded-top-2" src={item["image"]}/>
                                            <div className="card-body">
                                                <p className="bodySmal text-secondary my-1">{item['title']}</p>
                                                {price}    
                                            </div>
                                        </Link>
                                    </div>
                                    )
                            })
                        ):(<span className="text-center p-10">No Data Found</span>)
                    }
                    </div>
        </div>
              <Toaster position={"bottom-center"} />
        </>
    );
};

export default CategoryListbyid;