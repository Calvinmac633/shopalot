import React, { useState, useEffect } from "react";
import { REMOVE_LIST_ITEM, ADD_FAVORITE, UPDATE_LISTS, UPDATE_ALL_LISTS, LOADING, SET_CURRENT_LIST, ADD_LIST } from "../utils/actions"
import { Form, Button, Table } from 'react-bootstrap';
import API from "../utils/API"
import LookupForms from "../components/LookupForms";
import AppBar from "../components/AppBar"
import { useStoreContext } from "../utils/GlobalState";


export function Home() {

    const [state, dispatch] = useStoreContext();

    

    const getAllLists = () => {
        dispatch({ type: LOADING });
        API.getAllLists()
            .then(results => {
                console.log("this is APIresultinHome.JSS",results)
                dispatch({
                    type: UPDATE_ALL_LISTS,
                    lists: results.data,
                    // quantity: results.data,
                });
            })
            .catch(err => console.log(err));
    }

    // const {} = useParams()
    useEffect(() => {
        getAllLists();
    }, [])



    return (
        <div>
            <AppBar />
            <br></br>
            <LookupForms />
            {state ? (console.log("this is state inhome.jsssssssss",state)) : null}
        </div>

    );
}
