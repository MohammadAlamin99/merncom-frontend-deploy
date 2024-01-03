
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import {useNavigate} from "react-router-dom";
import { UserLoginRequest } from '../apiRequest/ApiRequest';
import SubmitBtn from './SubmitBtn';

const Login = () => {

const [email, setEmail] = useState("");
const [btnLoader, setBtnLoader] = useState(false)
const navigate = useNavigate();
const loginEmail = async(e)=>{
    e.preventDefault();
    if(email.length===0){
        toast.error('Email Required !');
    }
    else{
        setBtnLoader(true)
        let res = await UserLoginRequest(email)
        setBtnLoader(false)
        if(res['status']==='success'){
            toast.success(res['message']);
            navigate("/verify/"+email)
        }
        else{
            toast.error(res['message']);
        }
    }
}

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card h-100 ">
                        <div className="card-body">
                            <form>
                                 <label className="form-label my-2">Your Email Address</label>
                                 <input value={email} onChange={(e)=>{setEmail(e.target.value)}} type="email" className="form-control"/>
                                 <SubmitBtn Submit={btnLoader} text="Next" onClick={loginEmail} className="btn my-3 btn-success w-100"></SubmitBtn>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position={'bottom-center'} />
        </div>
       
    );
};

export default Login;