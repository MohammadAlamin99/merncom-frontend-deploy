
import { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import { CategoryListByRemark } from "../apiRequest/ApiRequest";
import StarRatings from "react-star-ratings/build/star-ratings";

const Products = () => {
    const [data_new,setData_new]=useState([])
    const [data_trending,setData_trending]=useState([])
    const [data_popular,setData_popular]=useState([])
    const [data_top,setData_top]=useState([])
    const [data_special,setData_special]=useState([])

    useEffect(()=>{
        (async()=>{
            let newProduct = await CategoryListByRemark("new");
            setData_new(newProduct)

            let trendingProduct = await CategoryListByRemark("trending");
            setData_trending(trendingProduct)

            let popularProduct = await CategoryListByRemark("popular");
            setData_popular(popularProduct)

            let TopProduct = await CategoryListByRemark("top");
            setData_top(TopProduct)

            let specialProduct = await CategoryListByRemark("special");
            setData_special(specialProduct)    
        })()
    },[0])


    return (
        <>
        <div className="section">
            <div className="container-fluid py-5 bg-light">
                <div className="row">
                    <h1 className="headline-4 text-center my-2 p-0">Our Products</h1>
                    <span className="bodySmal mb-3 text-center">Explore a World of Choices Across Our Most Popular</span>

                    <div className="col-12">
                        <div>
                            <ul className="nav nav-pills  p-3  justify-content-center mb-3" id="pills-tab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-new" type="button" role="tab" aria-controls="pills-home" aria-selected="true">New</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-trending" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Trending</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-popular" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Popular</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-top" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">Top</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="pills-disabled-tab" data-bs-toggle="pill" data-bs-target="#pills-special" type="button" role="tab" aria-controls="pills-disabled" aria-selected="false">Special</button>
                                </li>
                            </ul>

                            <div className="tab-content" id="pills-tabContent">
                                <div className="tab-pane fade show active" id="pills-new" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                   <div className="container">
                                       <div className="row">

{data_new.length > 0 ? (
  data_new.map((item, i) => {
    let price=<p className="bodyMedium  text-dark my-1">Price: TK: {item['price']} </p>
     if(item['discount']==="true"){
        price=<p className="bodyMedium  text-dark my-1">Price: <strike>TK: {item['price']}</strike> TK: {item['discountPrice']}</p>
    }

    return (
      <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12" key={i}>
        <Link to={"/details/"+item['_id']} className="card shadow-sm h-100 rounded-3 bg-white">
          <img className="w-100 rounded-top-2" src={item['image']} alt={item['title']} />
          <div className="card-body">
            <p className="bodySmal text-secondary my-1">{item['title']}</p>
            {price}
            <StarRatings
                            rating={parseFloat(item["star"])} // Rating value
                            starRatedColor="red" // Filled star color
                            starDimension="15px" // Size of stars
                            starSpacing="2px" // Space between stars
                            numberOfStars={5} // Total number of stars
                            name={`product-rating-${i}`} // Unique name for each product
                          />
                    
          </div>
        </Link>
      </div>
    );
  })
) : (
  <span className="text-center">No Data Found</span>
)}


                                       
                                       </div>
                                   </div>
                                </div>
                                <div className="tab-pane fade" id="pills-trending" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                                    <div className="container">
                                        <div className="row">

                                            {
                                                data_trending.length>0?(
                                                    data_trending.map((item,i)=>{
                                                        let price=<p className="bodyMedium  text-dark my-1">Price: TK: {item['price']} </p>
                                                        if(item['discount']==="true"){
                                                            price=<p className="bodyMedium  text-dark my-1">Price: <strike>TK: {item['price']}</strike> TK: {item['discountPrice']}</p>
                                                        }

                                                        return(
                                                            <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12" key={i}>
                                                                <Link to={"/details/"+item['_id']}className="card shadow-sm h-100 rounded-3 bg-white">
                                                                    <img className="w-100 rounded-top-2" src={item['image']}/>
                                                                    <div className="card-body">
                                                                        <p className="bodySmal text-secondary my-1">{item['title']}</p>
                                                                        {price}
                                                                        <StarRatings
                            rating={parseFloat(item["star"])} // Rating value
                            starRatedColor="red" // Filled star color
                            starDimension="15px" // Size of stars
                            starSpacing="2px" // Space between stars
                            numberOfStars={5} // Total number of stars
                            name={`product-rating-${i}`} // Unique name for each product
                          />
                                                                        
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                ):(<span className="text-center">No Data Found</span>)
                                            }
                                        </div>
                                    </div>
                                </div>


                                <div className="tab-pane fade" id="pills-popular" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                                    <div className="container">
                                        <div className="row">

                                            {
                                                data_popular.length>0?(
                                                    data_popular.map((item,i)=>{
                                                        let price=<p className="bodyMedium  text-dark my-1">Price: ${item['price']} </p>
                                                        if(item['discount']===true){
                                                            price=<p className="bodyMedium  text-dark my-1">Price: <strike>${item['price']}</strike> ${item['discountPrice']}</p>
                                                        }

                                                        return(
                                                            <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12" key={i}>
                                                                <Link to={"/details/"+item['_id']} className="card shadow-sm h-100 rounded-3 bg-white">
                                                                    <img className="w-100 rounded-top-2" src={item['image']}/>
                                                                    <div className="card-body">
                                                                        <p className="bodySmal text-secondary my-1">{item['title']}</p>
                                                                        {price}
                                                                        <StarRatings
                            rating={parseFloat(item["star"])} // Rating value
                            starRatedColor="red" // Filled star color
                            starDimension="15px" // Size of stars
                            starSpacing="2px" // Space between stars
                            numberOfStars={5} // Total number of stars
                            name={`product-rating-${i}`} // Unique name for each product
                          />
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )
                                                    })
                                                ):(<span className="text-center">No Data Found</span>)
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="tab-pane fade" id="pills-top" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex="0">

<div className="container">
    <div className="row">

        {
            data_top.length>0?(
                data_top.map((item,i)=>{
                    let price=<p className="bodyMedium  text-dark my-1">Price:Tk {item['price']} </p>
                    if(item['discount']===true){
                        price=<p className="bodyMedium  text-dark my-1">Price: <strike>Tk{item['price']}</strike> {item['discountPrice']}</p>
                    }

                    return(
                        <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12" key={i}>
                            <Link to={"/details/"+item['_id']} className="card shadow-sm h-100 rounded-3 bg-white">
                                <img className="w-100 rounded-top-2" src={item["image"]}/>
                                <div className="card-body">
                                    <p className="bodySmal text-secondary my-1">{item['title']}</p>
                                    {price}
                                    <StarRatings
                            rating={parseFloat(item["star"])} // Rating value
                            starRatedColor="red" // Filled star color
                            starDimension="15px" // Size of stars
                            starSpacing="2px" // Space between stars
                            numberOfStars={5} // Total number of stars
                            name={`product-rating-${i}`} // Unique name for each product
                          />
                                </div>
                            </Link>
                        </div>
                    )
                })
            ):(<span className="text-center">No Data Found</span>)
        }
    </div>
</div>

</div>



<div className="tab-pane fade" id="pills-special" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex="0">

<div className="container">
    <div className="row">

        {
            data_special.length>0?(
                data_special.map((item,i)=>{
                    let price=<p className="bodyMedium  text-dark my-1">Price: Tk{item['price']} </p>
                    if(item['discount']===true){
                        price=<p className="bodyMedium  text-dark my-1">Price: <strike>Tk{item['price']}</strike> ${item['discountPrice']}</p>
                    }

                    return(
                        <div className="col-md-3 p-2 col-lg-3 col-sm-6 col-12" key={i}>
                            <Link to={"/details/"+item['_id']} className="card shadow-sm h-100 rounded-3 bg-white">
                                <img className="w-100 rounded-top-2" src={item["image"]}/>
                                <div className="card-body">
                                    <p className="bodySmal text-secondary my-1">{item['title']}</p>
                                    {price}
                                    <StarRatings
                            rating={parseFloat(item["star"])} // Rating value
                            starRatedColor="red" // Filled star color
                            starDimension="15px" // Size of stars
                            starSpacing="2px" // Space between stars
                            numberOfStars={5} // Total number of stars
                            name={`product-rating-${i}`} // Unique name for each product
                          />
                                </div>
                            </Link>
                        </div>
                    )
                })
            ):(<span className="text-center">No Data Found</span>)
        }
    </div>
</div>

</div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>

    );
};

export default Products;