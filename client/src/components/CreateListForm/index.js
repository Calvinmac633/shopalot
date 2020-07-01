import { useStoreContext } from "../../utils/GlobalState";
import { UPDATE_LISTS, LOADING } from "../../utils/actions"
import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../../utils/API"
import "./CreateListForm.css"
import { Form, Button, ThemeProvider } from 'react-bootstrap';

// import codename from ZOEYTHING
// const codename = "Turtle-Apple";

function CreateListForm() {
  const { codename } = useParams();
  const nameRef = useRef();
  const quantityRef = useRef();

  // const { nameRef, quantityRef} = useRef();
  // const bodyRef = useRef();
  // const authorRef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    console.log(nameRef.current.value)
    console.log(quantityRef.current.value)
    API.addItem(codename, {
      itemName: nameRef.current.value,
      quantity: quantityRef.current.value,
    })
      .then(result => {
        console.log("THIS IS THE API CLICK RESULT", result)
        dispatch({
          type: UPDATE_LISTS,
          // quantity: result.data,
          list: result.data
        });
      })
      .catch(err => console.log(err));

    nameRef.current.value = "";
    quantityRef.current.value = "";
  };

  const addFavorite = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    API.addFavorite(codename, {
      favorite: true,
    })
      .then(result => {
        dispatch({
          type: UPDATE_LISTS,
          list: result.data
        })
      })
      .catch(err => console.log(err))
  }

  return (
    <Form>
      <style type="text/css">
        {`
    .my-btn {
      width: 200;
    margin: auto;
    color: #FFFFFF;
    font-size: 1.35rem;
    background-color: rgb(63,81,225, 0.9); 
    border: 3px solid rgb(63,81,225, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    margin-Bottom: 1rem;
    font-weight: 400;
    }
    .my-btn:active {
      background-color: #492a84e3;  
    }
    .form-control{
      width:200;
      margin: auto;
      font-Family: 'Montserrat', sans-serif;;
      font-size: 60px;
      border: 3px solid #856c8b;
  }

    .form-control{
      width:200;
      margin: auto;
      font-Family: 'Montserrat', sans-serif;;
      font-size: 1rem;
      border: 3px solid rgb(63,81,181);
  }
  
  .form-text{
    margin: auto;
    font-size:1rem;
    color: #3f8cb5;
}
    
    `}
      </style>
      <Form.Group className="formsContainer">
        <Form.Group controlId="formSearch">
          <ThemeProvider prefixes={{ form: 'form-text' }}>
            {/* <Form.Text className="text-muted">
          Enter the item name.
          </Form.Text> */}
          </ThemeProvider>{' '}
          <ThemeProvider prefixes={{ form: 'form-control form-control-search' }}>
            <Form.Control ref={nameRef} type="text" placeholder="Add Item" />
          </ThemeProvider>{' '}

        </Form.Group>
        <Form.Group controlId="formQuantity">
          <ThemeProvider prefixes={{ form: 'form-control form-control-search' }}>
            {/* <Form.Text className="text-muted">

          Enter the item quantity
              </Form.Text> */}
            <Form.Control ref={quantityRef} type="text" placeholder="Quantity" />
          </ThemeProvider>{' '}

        </Form.Group>

      </Form.Group>
      <ThemeProvider prefixes={{ btn: 'my-btn' }}>
        <Button onClick={handleSubmit} variant="flat" type="button">Add to list</Button>
      </ThemeProvider>{' '}
    </Form>
  )
}
export default CreateListForm;