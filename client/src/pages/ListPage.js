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

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { createMuiTheme } from '@material-ui/core/styles'

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
                    // codename: "dog-peach",
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


    const [checked, setChecked] = React.useState([0]);
    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };



    const theme = createMuiTheme({
        typography: {
            body2: {
                fontSize: "500rem",
            }
        }
    })
    const useStyles = makeStyles((theme) => ({
        root: {
            width: '100%',
            maxWidth: 1200,
            // backgroundColor: theme.palette.background.paper,
            backgroundColor: "rgba(250, 250, 250, 0.9)",
        },
    }));
    const classes = useStyles();
    var count = 1

    function copy() {
        var text = document.getElementById("codenameText").innerText;
        var elem = document.createElement("textarea");
        document.body.appendChild(elem);
        elem.value = text;
        elem.select();
        document.execCommand("copy");
        document.body.removeChild(elem);
        alert("Your password has been copied to your clipboard!")
    }

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

            <main role="main">
                <section>
                    <div class="container">
                        <h2>"{state.currentList.listname}"</h2>
                        {console.log("this be strate", state)}
                        <CreateListForm />

                        {state.currentList.items.length > 0 ?
                            <>
                                <List className={classes.root}>
                                    {state.currentList.items.map(item =>
                                        <ListItem role={undefined} dense button onClick={handleToggle(count)}>
                                            {/* <ListItemIcon>
                                                <Checkbox
                                                    edge="start"
                                                    checked={checked.indexOf(count++) !== -1}
                                                    tabIndex={-1}
                                                    disableRipple
                                                    inputProps={{ 'aria-labelledby': count++ }, {'aria-label': 'secondary checkbox'}}
                                                />
                                            </ListItemIcon> */}
                                            <ListItemIcon>
                                                <div>{count++}</div>
                                            </ListItemIcon>
                                            <ListItemText style={{ fontSize: '2rem!important' }} primary={item.itemName} secondary={item.quantity} />
                                            <ListItemSecondaryAction>
                                                <IconButton edge="end" aria-label="comments">
                                                    <DeleteIcon onClick={() => {
                                                        removeListItem(item._id)
                                                    }} />
                                                </IconButton>
                                            </ListItemSecondaryAction>
                                        </ListItem>
                                        // <td>{item.itemName}</td>
                                        // <td>{item.quantity}</td>
                                        // <td><Button style={{ display: "flex", justifyContent: "center", margin: "auto", marginTop: ".15rem", marginBottom: ".15rem", height: "1.5rem", width: "1.5rem", alignItems: "center" }} onClick={() => {
                                        //     removeListItem(item._id)
                                        // }}>
                                        //     <FontAwesomeIcon style={{ height: ".5rem", width: ".5rem" }} icon={faCheck}>
                                        //         {item.purchased}
                                        //     </FontAwesomeIcon>
                                        // </Button>
                                        // </td>
                                        // </ListItem>
                                    )}

                                </List>
                                <br></br>
                                <div className="faveButtonContainer">
                                    <button className="saveFaveButton" onClick={addFavorite}>Save to favorites</button>
                                    <button className="deleteFaveButton" onClick={deleteFavorite}>Delete from favorites</button>
                                </div>
                                <h4>Share this List's codename with others:</h4>
                                <button id="codenameText" onClick={copy} className="codenameButton">
                                <h3>{state.currentList.codename}</h3>
                                    </button>
                                    <small>Click to copy to Clipboard!</small>
                            </>

                            : null

                        }

                    </div>
                </section>
            </main>
        </div >) : <p>-----STATE AINT WERKIN------</p>



    );
};

