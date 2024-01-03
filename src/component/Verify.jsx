
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { UserVerifyRequest } from '../apiRequest/ApiRequest';
import { useParams } from 'react-router-dom';
import SubmitBtn from './SubmitBtn';


const Verify = () => {
    let {email}=useParams();
const [pin, setPin] = useState("");
const [BtnLoader, setBtnLoader] = useState(false);
const loginVerify = async(e)=>{
    e.preventDefault();
    if(pin.length===0){
        toast.error('Verification Code Required !');
    }
    else{
        setBtnLoader(true);
        let res = await UserVerifyRequest(email, pin);
        setBtnLoader(false);
        if(res['status']==='success'){
            toast.success(res['message']);
            window.location.href=sessionStorage.getItem('lastLocation')
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
                                 <label className="form-label my-2">Your Verification Code</label>
                                 <input value={pin} onChange={(e)=>{setPin(e.target.value)}} type="text" className="form-control"/>
                                 <SubmitBtn text="Verify" Submit={BtnLoader} onClick={loginVerify} className="btn my-3 btn-success w-100"></SubmitBtn>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster position={'bottom-center'} />
        </div>
       
    );
};

export default Verify;