
// https://git.heroku.com/shopalot-checkitout.git

import React, { useState, useEffect } from "react";
import { REMOVE_LIST_ITEM, ADD_FAVORITE, UPDATE_LISTS, UPDATE_ALL_LISTS, LOADING, SET_CURRENT_LIST, ADD_LIST } from "../utils/actions"
import { Form, Button, Table } from 'react-bootstrap';
import API from "../utils/API"
import LookupForms from "../components/LookupForms";
import AppBar from "../components/AppBar"
import { useStoreContext } from "../utils/GlobalState";
import "./homeStyle.css"

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { Link, useParams } from "react-router-dom";
import fire from "../config/fire";

import ListGroup from 'react-bootstrap/ListGroup'

// import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({

    root: {
        margin: ".5rem",
        marginLeft: "1rem",
        marginRight: "1rem",
        // height: "100px"
        // backgroundColor: "rgba(255, 255, 255, 0.796)",
        backgroundColor: "transparent",
        padding: 0,

    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: "#2929FF80"
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        // marginTop: theme.spacing(1),
        color: "#2929FF80",
        margin: 0,
    },
    display: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        // marginBottom: "200px",
    },
    title: {
        // color: "rgba(49, 30, 111)",
        color: "white",
        fontSize: "2.5rem",
        letterSpacing: ".1rem",
        fontWeight: 500,
        textAlign: "center",
        margin: 0,
        fontFamily: "'Montserrat', sans-serif;",
        borderBottom: "rgba(200,200,200,0.75) solid 2px"
    },
    titleLine: {
        // color: "rgba(49, 30, 111)",
        color: "white",
        fontSize: ".5rem",
        letterSpacing: ".1rem",
        fontWeight: 900,
        textAlign: "center",
        margin: 0,
        fontFamily: "'Montserrat', sans-serif;",
    },
    button: {
        paddingLeft: ".5rem",
        paddingTop: "0rem",
        paddingRight: ".5rem",
        paddingBottom: "0rem",
        margin: 0,
        backgroundColor: "rgba(44, 139, 255, 0.6)"
    },
    cardTitles: {
        paddingLeft: ".5rem",
        paddingTop: "0.25rem",
        paddingRight: ".5rem",
        paddingBottom: "0rem",
        margin: 0,
    },
    list: {
        backgroundColor: "transparent",
        color: "black",
        padding: 0,
    },
    buttonList: {
        backgroundColor: "rgb(63,81,181, 0.95)",
        color: "rgb(225, 225, 225, 0.99)",
        border: "none",
        fontSize: "1.25rem",
        padding: ".25rem",
        paddingLeft: "1.25rem",
        paddingRight: "1.25rem",
        marginBottom: ".5rem",
        marginTop: ".5rem",
        letterSpacing: ".15rem",
        fontWeight: 500,
    },
    listGroup: {
        padding: 0,
    },
}));

export function Home(props) {

    const [state, dispatch] = useStoreContext();

    const classes = useStyles();

    const getAllLists = () => {
        dispatch({ type: LOADING });
        API.getAllLists()
            .then(results => {
                dispatch({
                    type: UPDATE_ALL_LISTS,
                    lists: results.data,
                    // quantity: results.data,
                });
            })
            .catch(err => console.log(err));
    }

    const faveClick = (e) => {
        console.log(e.target)
        e.preventDefault();
        API.getList(e.target.value)
            .then(res => {
                window.location.href = "list/" + res.data.codename
            }
            )

    }

    useEffect(() => {
        getAllLists();
    }, [])

    return (

        <div>
            {/* <Container component="main" maxWidth="xs"> */}
            <CssBaseline />
            <Card className={classes.root} elevation={0}>
                <CardContent className={classes.cardTitles}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Your Favorites
                            </Typography>
                    {/* <p className={classes.titleLine}>|||||||||||||||||||||||||||</p> */}
                </CardContent>
                {(state.lists.length === 0) ? <div>Create a list above and save to your favorites!</div> :
                    <ul className="listGroup">
                        {state.lists.map(list => {

                            if (list.favorites.includes(props.user.email)) {
                                return (
                                    <ListGroup
                                        variant="flush"
                                        className={classes.listGroup}
                                    >

                                        <ListGroup.Item
                                            className={classes.list}
                                        >
                                            <Link href="/List">
                                                <Button
                                                    onClick={faveClick}
                                                    type="submit"
                                                    size="small"
                                                    required
                                                    className={classes.buttonList}
                                                    value={list.codename}
                                                    variant="contained"
                                                >
                                                    {list.listname}
                                                </Button>
                                            </Link>
                                        </ListGroup.Item>
                                    </ListGroup>
                                    // <CardActions>
                                    //     <Link href="/List">
                                    //         <Button
                                    //             onClick={faveClick}
                                    //             type="submit"
                                    //             size="small"
                                    //             required
                                    //             className={classes.button}
                                    //             value={list.codename}
                                    //         >
                                    //             {list.listname}
                                    //         </Button>
                                    //     </Link>
                                    // </CardActions>
                                )
                            } else {
                                return null
                            }
                        }

                        )}
                    </ul>
                }

            </Card>
            {/* </Container> */}

            <h5 id="user">Signed in as: <em>{props.user.email}</em></h5>

            <LookupForms />

        </div >

    );
}
