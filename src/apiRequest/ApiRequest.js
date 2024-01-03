
import  axios  from 'axios';
import unauthorized from '../utility/unauthorized';

let BaseUrl = "https://e-commerse-project-xzpe.vercel.app/"

export async function BrandListRequest(){
   try {
    let result = await axios.get("https://e-commerse-project-xzpe.vercel.app/api/v1/BrandList");
    let data = result.data['data']
    return data;
   } catch (e) {
    return [];
   }
}
export async function CategoryListRequest(){
   try {
    let result = await axios.get("https://e-commerse-project-xzpe.vercel.app/api/v1/CategoryList");
    let data = result.data['data']
    return data;
   } catch (e) {
    return [];
   }
}


export async function CategoryListByRemark(remark){
   try {
    let result = await axios.get("https://e-commerse-project-xzpe.vercel.app/api/v1/ListByRemark/"+remark);
    let data = result.data['data']
    return data;
   } catch (e) {
    return [];
   }
}

export  async function DetailsListRequest(id) {
   try {
       let result=await axios.get('https://e-commerse-project-xzpe.vercel.app/api/v1/ProductDetails/'+id);
       let data=result.data['data'];
       return data;
   }
   catch (e) {
       return [];
   }
}

export  async function ListBySmilierRequest(categoryID) {
   try {
       let result=await axios.get('https://e-commerse-project-xzpe.vercel.app/api/v1/ListBySmilier/'+categoryID);
       let data=result.data['data'];
       return data;
   }
   catch (e) {
       return [];
   }
}


export  async function AddWishListRequest(productID) {
   try {
       let reqBody = {"productID":productID} 
       let result=await axios.post('https://e-commerse-project-xzpe.vercel.app/api/v1/CreateWishList/',reqBody);
       let data=result.data;
       return data;
   }
   catch (e) {
      unauthorized(e.response.status)
       return [];
   }
}

export async function WishListRequest(){
    try {
        let result = await axios.get('https://e-commerse-project-xzpe.vercel.app/api/v1/WishList')
        let data = result.data;
        return data;
    } catch (e) {
        unauthorized(e.response.status)
       return [];
    }
}

export async function RemoveWishListRequest(productID){
    try {
        let reqBody = {"productID":productID} 
        let result = await axios.post('https://e-commerse-project-xzpe.vercel.app/api/v1/RemoveWishList',reqBody)
        let data = result.data;
        return data;
    } catch (e) {
        unauthorized(e.response.status)
       return [];
    }
}


// cart list 

export async function CartlistRequest(){
    try {
        let result = await axios.get('https://e-commerse-project-xzpe.vercel.app/api/v1/CartList');
        let data = result.data['data']
        return data;
    } catch (e) {
        unauthorized(e.response.status)
        return [];
    }
}
export async function RemoveCartlistRequest(productID){
    try {
        let reqbody = {"productID":productID}
        let result = await axios.post('https://e-commerse-project-xzpe.vercel.app/api/v1/RemoveCartList', reqbody);
        let data = result.data
        return data;
    } catch (e) {
        unauthorized(e.response.status)
        return [];
    }
}

export async function CreateCartlistRequest(reqbody){
    try {
        let result = await axios.post('https://e-commerse-project-xzpe.vercel.app/api/v1/CreateCartList', reqbody);
        let data = result.data
        return data;
    } catch (e) {
        unauthorized(e.response.status)
        return [];
    }
}

// invoice create

export async function InvoiceCreate(){
    try {
        let result = await axios.get('https://e-commerse-project-xzpe.vercel.app/api/v1/InvoiceCreate');
        let data = result.data
        return data['message']['desc'];
    } catch (e) {
        unauthorized(e.response.status)
        return [];
    }
}



// search keywoord

export async function SearchByKeyword(keyword){
    try {
     let result = await axios.get("https://e-commerse-project-xzpe.vercel.app/api/v1/ListByKeyword/"+keyword);
     let data = result.data['data'];
     return data;
    } catch (e) {
     return [];
    }
 }


 
// Category Details by id

export async function CategoryDetailsById(categoryID){
    try {
     let result = await axios.get("https://e-commerse-project-xzpe.vercel.app/api/v1/ListByCategory/"+categoryID);
     let data = result.data['data'];
     return data;
    } catch (e) {
     return [];
    }
 }

// user login

export  async function UserLoginRequest(email) {
   try {
       let reqBody = {"emailTo":email};
       let result = await axios.post('https://e-commerse-project-xzpe.vercel.app/api/v1/UserLogin/',reqBody)
       let data = result.data;
       return data;
   }
   catch (e) {
       return false
   }
}
//  Verification

export  async function UserVerifyRequest(email, code) {
   try {
    let reqbody = {"email":email,"otp":code}
    //    let reqbody1 = {"email":email};
    //    let reqbody2 = {"code": code}
       let result = await axios.post('https://e-commerse-project-xzpe.vercel.app/api/v1/UserVerify/',reqbody);
       let data = result.data;
       return data;
   }
   catch (e) {
       return false
   }
}

// create profile
export  async function CreateProfileRequiest(
     cus_name,
     cus_city,
     cus_state,
     cus_postcode,
     cus_country,
     cus_phone,
     cus_fax,
     ship_name,
     ship_city,
     ship_state,
     ship_postcode,
     ship_country,
     ship_phone) {
    try {
     let reqbody = {cus_name:cus_name,
                    cus_city:cus_city,
                    cus_state:cus_state,
                    cus_postcode:cus_postcode,
                    cus_country:cus_country,
                    cus_phone:cus_phone,
                    cus_fax:cus_fax,
                    ship_name:ship_name,
                    ship_city:ship_city,
                    ship_state:ship_state,
                    ship_postcode:ship_postcode,
                    ship_country:ship_country,
                    ship_phone:ship_phone}
                    console.log(reqbody)
        let result = await axios.post('https://e-commerse-project-xzpe.vercel.app/api/v1/CreateProfile',reqbody);

       
        console.log(result)
       return result;
    }
    catch (e) {
        return false
    }
 }