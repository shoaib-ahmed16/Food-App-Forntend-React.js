import React,{useRef,useState} from 'react'
import classes from './Checkout.module.css';
const isEmpty = (value) => value.trim() === '';
const isNotFiveChars =(value) => value.trim().length !== 5;

const Checkout = (props) => {

  const [formInputsvalidity,setFormInputsValidity]=useState({
    name:true,
    street:true,
    city:true,
    postalCode:true
  })
  const nameInputRef =useRef();
  const streetInputRef =useRef();
  const postalCodeInputRef=useRef();
  const cityInputRef=useRef();
  const confirmHandler = (event) => {
    event.preventDefault();
    const enteredName =nameInputRef.current.value;
    const enteredStreet= streetInputRef.current.value;
    const enteredPostalCode =postalCodeInputRef.current.value;
    const enteredCity =cityInputRef.current.value;
    
    const enteredNameIsValid =!isEmpty(enteredName);
    const enteredStreetIsValid =!isEmpty(enteredStreet);
    const enteredCityIsValid =!isEmpty(enteredCity);
    const enteredPostalCodeIsValid =!isNotFiveChars(enteredPostalCode)

      setFormInputsValidity({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        postalCode:enteredPostalCodeIsValid,
        city:enteredCityIsValid
      })
    const formIsValid =enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalCodeIsValid;
    if(!formIsValid){
      return 

    }
    //submit the cart data
    props.onSubmit({
      name:enteredName,
      street:enteredStreet,
      city:enteredPostalCode,
      postalCode:enteredCity
      }
    );
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${(formInputsvalidity.name)?'':classes.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsvalidity.name && <p>Please enter a valid Name</p>}
      </div>
      <div className={`${classes.control} ${(formInputsvalidity.street)?'':classes.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsvalidity.street && <p>Please enter a valid Street</p>}
      </div>
      <div className={`${classes.control} ${(formInputsvalidity.postalCode)?'':classes.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputsvalidity.postalCode && <p>Please enter a valid Postal Code</p>}
      </div>
      <div className={`${classes.control} ${(formInputsvalidity.city)?'':classes.invalid}`}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef}/>
        {!formInputsvalidity.city && <p>Please enter a valid City</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;