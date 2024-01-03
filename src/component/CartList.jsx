import React, { useEffect, useRef, useState } from 'react';
import { CartlistRequest, CreateProfileRequiest, InvoiceCreate, RemoveCartlistRequest } from '../apiRequest/ApiRequest';
import toast, { Toaster } from "react-hot-toast";
import { Modal } from "react-bootstrap";

const CartList = () => {

    const [data_new, setData_new] = useState([]);
    const [refresh, setRefresh] = useState(0);
    const [BtnLoader, SetBtnLoader] = useState(false);
    const [Payable, SetPayable] = useState(0);
    const [load, setLoaded] = useState(false);

    const [data_payment, setData_payment] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        const fetchData = async () => {
            let CartList = await CartlistRequest();
            await setData_new(CartList);
        };

        fetchData();
    }, [refresh]);

    useEffect(() => {
        CalculatePayable();
    }, [data_new]);

    const Remove = async (productID) => {
        setLoaded(true)
        setData_new([]);
        let data = await RemoveCartlistRequest(productID);
        setLoaded(false)
        if (data['status'] === "success") {
            toast.success(data['message'])
        } else {
            toast.error(data['message'])
        }
        setRefresh(1);
    }

    const CalculatePayable = () => {
        if (data_new.length !== 0) {
            let sum = data_new.reduce((total, item) => total + parseInt(item['price']), 0);
            SetPayable(sum);
        }
    }


    const customerNameRef = useRef();
    const customerCityRef = useRef();
    const customerStateRef = useRef();
    const customerPostcodeRef = useRef();
    const customerCountryRef = useRef();
    const customerPhoneRef = useRef();
    const customerFaxRef = useRef();
    const shippingNameRef = useRef();
    const shippingCityRef = useRef();
    const shippingStateRef = useRef();
    const shippingPostcodeRef = useRef();
    const shippingCountryRef = useRef();
    const shippingPhoneRef = useRef();

    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Access input values using refs
        const name = customerNameRef.current.value;
        const city = customerCityRef.current.value;
        const state = customerStateRef.current.value;
        const postcode = customerPostcodeRef.current.value;
        const country = customerCountryRef.current.value;
        const phone = customerPhoneRef.current.value;
        const fax = customerFaxRef.current.value;
        const shippingName = shippingNameRef.current.value;
        const shippingCity = shippingCityRef.current.value;
        const shippingState = shippingStateRef.current.value;
        const shippingPostcode = shippingPostcodeRef.current.value;
        const shippingCountry = shippingCountryRef.current.value;
        const shippingPhone = shippingPhoneRef.current.value;

        if(name.length===0){
            toast.error("Customer Name Required !")
        }
        else if(city.length===0){
            toast.error("Customer City Required !")
        }
        else if(state.length===0){
            toast.error("Customer State Required !")
        }
        else if(postcode.length===0){
            toast.error("Customer postcode Required !")
        }
        else if(country.length===0){
            toast.error("Customer country Required !")
        }
        else if(phone.length===0){
            toast.error("Customer phone Required !")
        }
        else if(fax.length===0){
            toast.error("Customer fax Required !")
        }
        else if(shippingName.length===0){
            toast.error("Customer shippingName Required !")
        }
        else if(shippingCity.length===0){
            toast.error("Customer shippingCity Required !")
        }
        else if(shippingState.length===0){
            toast.error("Customer shippingState Required !")
        }
        else if(shippingPostcode.length===0){
            toast.error("Customer shippingPostcode Required !")
        }
        else if(shippingCountry.length===0){
            toast.error("Customer shippingCountry Required !")
        }
        else if(shippingPhone.length===0){
            toast.error("Customer shippingPhone Required !")
        }

        else{
                let result = await CreateProfileRequiest(name,city,state,postcode,country,phone,
                    fax,shippingName,shippingCity,shippingState,shippingPostcode,shippingCountry,shippingPhone);
                   
                if(result.data.status==="success"){
                    toast.success("Save your information");
                    let payment = await InvoiceCreate();
                    setShow(true)
                    setData_payment(payment);
                }
                else{
                    toast.error("something went wrong")
                }
        }

       
      };

    return (
        <div>
            {
                data_new.length === 0 ? (<span className="text-center p-10" style={{paddingLeft:"113px"}}>No Data Found</span>) : (
                    <div className="container mt-5">
                        <div className="row">
                            <div className="col-12">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Product</th>
                                            <th>Qty</th>
                                            <th>color</th>
                                            <th>Size</th>
                                            <th>Total</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data_new.map((item, i) => {
                                                return (
                                                    <tr key={i}>
                                                        <td>
                                                            <div className="d-flex">
                                                                <img className="product-img-sm" src={item['product']['image']} alt={item['product']['title']} />
                                                                <div className="mx-2">
                                                                    <span>{item['product']['title']}</span><br />
                                                                    <span><b>$ {item['product']['price']}</b></span>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>{item['qty']}</td>
                                                        <td>{item['color']}</td>
                                                        <td>{item['size']}</td>
                                                        <td>Tk {item['price']}</td>
                                                        <td>
                                                            <button onClick={() => { Remove(item['productID']) }} className="btn btn-danger btn-sm">Remove</button>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div>
                            <form className='formTable'>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Customer Name"
                                    ref={customerNameRef}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Customer City"
                                    ref={customerCityRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Customer State"
                                    ref={customerStateRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Customer Postcode"
                                    ref={customerPostcodeRef}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Customer Country"
                                    ref={customerCountryRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Customer Phone"
                                    ref={customerPhoneRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Customer Fax"
                                    ref={customerFaxRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Shiping Name"
                                    ref={shippingNameRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Shiping City"
                                    ref={shippingCityRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Shiping State"
                                    ref={shippingStateRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Shiping Postcode"
                                    ref={shippingPostcodeRef}
                                    />
                                </div>

                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Shiping Country"
                                    ref={shippingCountryRef}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Shiping Phone"
                                    ref={shippingPhoneRef}
                                    />
                                </div>
                               
                        <div className="row">
                            <div className="col">
                            <br />
                                <h6 className='text-bold'>Payable: Tk {Payable}</h6>
                                <button onClick={handleSubmit} className="btn my-2 btn-success">Check Out</button>
                            </div>
                        </div>
                            </form>
                        </div>



                    </div>
                )
            }

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <h6>Pay Now</h6>
                </Modal.Header>
                <Modal.Body>
                    <div className="container">
                        <div className="row">
                            {
                                data_payment.map((item, i) => {
                                    return (
                                        <div key={i} className="col-md-2 col-lg-2 p-1 col-sm-6 col-6">
                                            <a target="_blank" href={item['redirectGatewayURL']} rel="noreferrer">
                                                <img className="pay-img w-100" src={item['logo']} alt="Payment Logo" />
                                            </a>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-danger" onClick={handleClose}>Close</button>
                </Modal.Footer>
            </Modal>

            <Toaster position={"bottom-center"} />
        </div>
    );
};

export default CartList;
