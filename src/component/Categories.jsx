import { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import { CategoryListRequest } from "../apiRequest/ApiRequest";
import Loading from 'react-fullscreen-loading';



const Categories = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [load, setLoaded] = useState(false);

    

    useEffect(()=>{
        (async()=>{
            setLoaded(true)
            let result = await CategoryListRequest();
            setLoaded(false)
            setData(result)
        })()
    
    },[])
    return (
        <>
       {
        load?( <Loading loading={true} loaderColor="#198754" />):(
            <div className="section">
            <div className="container">
                    <div className="row">
                        <h1 className="headline-4 text-center my-2 p-0">Top Categories</h1>
                        <span className="bodySmal mb-5 text-center">Explore a World of Choices Across Our Most Popular <br/>Shopping Categories</span>
    
                        {
                            data.length>0?(
                                data.map((item, i)=>{
                                    return(
                                        <div className="col-6 col-lg-8r text-center col-md-8r p-2" key={i}>
                                                <Link to={"/categoryListID/"+item['_id']} className="card h-100 rounded-3 bg-light">
                                                   
                                                            <div className="card-body">
                                                        <img className="w-75" src={item['categoryImg']}/>
                                                        <p className="bodySmal mt-3">{item['categoryName']}</p>
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
        )
       }
        </>
    );
};

export default Categories;