import { useStoreContext } from "../../utils/GlobalState";
import { REMOVE_LIST, UPDATE_LISTS, LOADING, SET_CURRENT_LIST, ADD_LIST } from "../../utils/actions"
import React, { useState, useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { Form, Button, Table } from 'react-bootstrap';
import API from "../../utils/API"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import AppBar from "../AppBar"
// import codename from ZOEYTHING
const codename = "Turtle-Apple";

function CreateListForm() {
  const nameRef = useRef();
  // const bodyRef = useRef();
  // const authorRef = useRef();
  const [state, dispatch] = useStoreContext();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    console.log(nameRef.current.value)
    API.addItem(codename, {

      itemName: nameRef.current.value,
      // body: bodyRef.current.value,
      // author: authorRef.current.value
    })
      .then(result => {
        console.log("THIS IS THE API CLICK RESULT", result)
        dispatch({
          type: UPDATE_LISTS,
          list: result.data
        });
      })
      .catch(err => console.log(err));

    nameRef.current.value = "";
    //   bodyRef.current.value = "";
  };

  return (
    <Form>
      <Form.Group controlId="formSearch">
        <Form.Control ref={nameRef} type="text" placeholder="Add item" />
        <Form.Text className="text-muted">
          Enter the item name.
          </Form.Text>
      </Form.Group>
      <Button onClick={handleSubmit} variant="primary" type="button">Add to list</Button>
    </Form>
  )
}
export default CreateListForm;