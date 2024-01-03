import React, { useEffect, useState } from 'react';
import { RemoveWishListRequest, WishListRequest } from '../apiRequest/ApiRequest';
import {Link} from "react-router-dom";
import toast, {Toaster} from "react-hot-toast";
import SubmitBtn from './SubmitBtn';

const WishList = () => {
    const [data_new, setData_new] = useState([]);
    
    useEffect(()=>{
        (async()=>{
            let data = await WishListRequest();
            setData_new(data['data'])
        })([])
    })


    const remove = async(productID)=>{
        setData_new([])
        let data = await RemoveWishListRequest(productID)
        if(data['status']==="success"){
            toast.success(data['message'])
        }else {
            toast.error(data['message'])
        }
    }


    return (
        <>
        <div className="container d-flex">
                    {
                        data_new.length>0?(
                           
                            data_new.map((item,i)=>{

                                let price=<p className="bodyMedium  text-dark my-1">Price: ${item['product']['price']} </p>
                                if(item['discount']===true){
                                    price=<p className="bodyMedium  text-dark my-1">Price: <strike>${item['product']['price']}</strike> ${item["product"]['discountPrice']}</p>
                                }

                                return(
                                    <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12" key={i}>
                                        <Link to={"/details/"+item['productID']} className="card shadow-sm h-100 rounded-3 bg-white">
                                            <img className="w-100 rounded-top-2" src={item["product"]['image']}/>
                                            <div className="card-body">
                                                <p className="bodySmal text-secondary my-1">{item["product"]['title']}</p>
                                                {price}
                                              
                                                
                                            </div>
                                        </Link>
                                        <SubmitBtn Submit={false} className='btn btn-danger btn-sm' text="Remove" onClick={()=>{remove(item['productID'])}}></SubmitBtn>
                                    </div>
                                    )
                            })
                        ):(<span className="text-center p-10">No Data Found</span>)
                    }
        </div>
              <Toaster position={"bottom-center"} />
        </>
    );
};

export default WishList;