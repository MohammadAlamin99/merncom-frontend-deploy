
const SubmitBtn = (props) => {

   if(props.Submit===false){
        return <button onClick={props.onClick} className={props.className}>{props.text}</button>
   }

   else{
        return <button className={props.className} type="button" disabled>
        <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        Loading...
      </button>
   }
};

export default SubmitBtn;