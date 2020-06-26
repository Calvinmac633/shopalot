import "./ListPage.css"
import { useStoreContext } from "../utils/GlobalState";
import { REMOVE_LIST_ITEM, UPDATE_LISTS, LOADING, SET_CURRENT_LIST, ADD_LIST } from "../utils/actions"
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Table, ThemeProvider } from 'react-bootstrap';
import API from "../utils/API";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import AppBar from "../components/AppBar"
import CreateListForm from "../components/CreateListForm"
import { faHome } from '@fortawesome/free-solid-svg-icons';

// import codename from ZOEYTHING
export function ListPage(props) {
    const { codename } = useParams();
    const { id } = useParams();

    console.log("this is props ==>", props)
    // const [formObject, setFormObject] = useState([]);

    const [state, dispatch] = useStoreContext();

    const removeListItem = (id) => {
        console.log(id)
        API.deleteList(codename, id)
            .then((result) => {
                console.log("THIS IS THE DELETE API CLICK RESULT", result)
                dispatch({
                    type: REMOVE_LIST_ITEM,
                    codename: "dog-peach",
                    _id: id, //the second id is not defined
                });
            })
            .catch(err => console.log(err));
    };

    const addFavorite = (e) => {
        e.preventDefault();
        console.log("THIS IS STATE.CURRENTLIST FROM fave BUTTONE", state)
        const faveList = state.currentList.favorites;
        if (faveList.includes(props.user.email)) {
            return null
        } else {
            faveList.push(props.user.email)
            console.log(faveList)
            API.addFavorite(codename, {
                favorites: faveList,
            }).then(result => {
                console.log("This is the API result from addFavorite", result)
                dispatch({
                    type: UPDATE_LISTS,
                    list: state.currentList
                });
            })
        }
    };

    const deleteFavorite = (e) => {
        e.preventDefault();
        const faveList = state.currentList.favorites;
        if (faveList.includes(props.user.email)) {
            const index = faveList.indexOf(props.user.email)
            faveList.splice(index, 1, "")
            console.log(faveList)
            API.deleteFavorite(codename, {
                favorites: faveList,
            }).then(result => {
                console.log("This is the API result from deleteFavorite", result)
                dispatch({
                    type: UPDATE_LISTS,
                    list: state.currentList
                });
            })
        } else {
            return null
        }
    }

    const getList = (codename) => {
        dispatch({ type: LOADING });
        API.getList(codename)
            .then(results => {
                console.log(results)
                dispatch({
                    type: SET_CURRENT_LIST,
                    list: results.data,
                    // quantity: results.data,
                });
            })
            .catch(err => console.log(err));
    }

    // const {codename} = useParams()
    useEffect(() => {
        getList(codename);
    }, [])

    var count = 1


    return (
        state.currentList.codename !== 0 ? (<div>
            <style type="text/css">
                {`
                    .my-table {
                        width: 100%;
                        margin-right: 12rem;
                    }
                    .my-head {
                        color: white;
                    }
    
                `}
            </style>
            {/* <AppBar link1="/" text1={"Your codename is: " + codename}> */}
            <AppBar link1="/" text1={faHome}>
            </AppBar>
            {/* <h1>Your codename is:</h1>
            <h2>{codename}</h2> */}
            <br></br>
            <main role="main">
                <section>
                    <div class="container">
                        {/* <h1>Your codename is:</h1>
                        <h2>{codename}</h2>
                        <br></br> */}
                        <h5 id="user">You are signed in as {props.user.email}</h5>
                        <CreateListForm />
                        {/* <div className="faveButtonContainer">
                            <button className="saveFaveButton" onClick={addFavorite}>Save to favorites</button>
                            <button className="deleteFaveButton" onClick={deleteFavorite}>Delete from favorites</button>
                        </div> */}
                        {/* <p className="codenameHead">
                            {"Your codename is: " + codename}
                        </p> */}

                        {console.log("This is state -->", state)}
                        <ThemeProvider prefixes={{ table: 'my-table' }}>
                            <div className="tableContainer">
                                <Table
                                    bordered
                                    responsive
                                    size="sm">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Item Name
                                    </th>
                                            <th>Quantity</th>
                                            <th>Purchased?</th>
                                            {/* <th>ID</th> */}
                                        </tr>
                                        {console.log(state.currentList)}
                                    </thead>

                                    {/* This checks to see if there are any items, if not -> does nothing, if it does -> return table body */}
                                    {state.currentList.items ? <tbody>
                                        {console.log("this is state.currentList.items ----> ", state.currentList.items)}
                                        {console.log("this is state ----> ", state)}
                                        {state.currentList.items.map(item =>
                                            <tr>
                                                <td className="countCell">{count++}</td>
                                                <td>{item.itemName}</td>
                                                <td>{item.quantity}</td>
                                                <td><Button style={{ display: "flex", justifyContent: "center", margin: "auto", marginTop: ".15rem", marginBottom: ".15rem", height: "1.5rem", width: "1.5rem", alignItems: "center" }} onClick={() => {
                                                    removeListItem(item._id)
                                                }}>
                                                    <FontAwesomeIcon style={{ height: ".5rem", width: ".5rem" }} icon={faCheck}>
                                                        {item.purchased}</FontAwesomeIcon>
                                                </Button>
                                                </td>
                                                {/* <td>{item._id}</td> */}
                                            </tr>
                                        )}

                                    </tbody> : null


                                    }

                                    {state.currentList.length > 0 ? <tbody>
                                        {console.log("this is state.currentList ----> ", state.currentList)}
                                        {console.log("this is state ----> ", state)}
                                        {state.currentList.map(item =>
                                            <tr>
                                                <td>{count++}</td>
                                                <td>{item.itemName}</td>
                                                <td>{item.quantity}</td>
                                                <td><Button className="purchasedButton" onClick={() => {
                                                    removeListItem(item._id)
                                                }}>
                                                    <FontAwesomeIcon icon={faCheck}>
                                                        {item.purchased}</FontAwesomeIcon>
                                                </Button>
                                                </td>
                                                {/* <td>{item._id}</td> */}
                                            </tr>
                                        )}

                                    </tbody> : null


                                    }



                                </Table>
                            </div>
                            <br></br>
                            <div className="faveButtonContainer">
                                <button className="saveFaveButton" onClick={addFavorite}>Save to favorites</button>
                                <button className="deleteFaveButton" onClick={deleteFavorite}>Delete from favorites</button>
                            </div>
                        </ThemeProvider>{' '}

                    </div>
                </section>
            </main>
        </div>) : <p>-----STATE AINT WERKIN------</p>



    );
};

