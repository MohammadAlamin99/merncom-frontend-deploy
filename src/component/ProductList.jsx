import React, { useEffect, useState } from 'react';
import {Link, useParams} from "react-router-dom";
import {Toaster} from "react-hot-toast";
import { SearchByKeyword } from '../apiRequest/ApiRequest';
import Loading from 'react-fullscreen-loading';

const ProductList = () => {
    let {keyword}=useParams();
    const [data_new, setData_new] = useState([]);
    const [load, setLoaded] = useState(false);


    useEffect(()=>{
        (async () => {
            setLoaded(true)
            let result= await SearchByKeyword(keyword);
            setData_new(result);
            setLoaded(false)
        })()
    },[0])



    return (
        <>
        {
            load?( <Loading loading={true} loaderColor="#198754" />):(
                <div className="container">
                    <div className="row">
                    {
                        data_new.length>0?(
                           
                            data_new.map((item,i)=>{

                                let price=<p className="bodyMedium  text-dark my-1">Price: Tk {item['price']} </p>
                                if(item['discount']===true){
                                    price=<p className="bodyMedium  text-dark my-1">Price: <strike>Tk {item['price']}</strike> ${item['discountPrice']}</p>
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
            )
        }
              <Toaster position={"bottom-center"} />
        </>
    );
};

export default ProductList;