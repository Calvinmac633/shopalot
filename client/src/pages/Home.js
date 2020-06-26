
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

const useStyles = makeStyles((theme) => ({

    root: {
        margin: ".5rem",
        marginLeft: "3rem",
        marginRight: "3rem",
        // height: "100px"
        backgroundColor: "rgba(255, 255, 255, 0.796)",
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
        color: "rgba(49, 30, 111)",
        fontSize: "1.5rem",
        textAlign: "center",
        margin: 0,
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
    }
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
        e.preventDefault();
        API.getList(e.target.value
        )
            .then(res => {
                window.location.href = "list/" + res.data.codename
            }
            )

    }

    // const logout = (e) => {
    //     e.preventDefault();
    //     console.log(e.target.value);
    //     fire.auth.signOut()
    // }

    // const {} = useParams()
    useEffect(() => {
        getAllLists();
    }, [])




    return (

        <div>
            <AppBar />
            {/* <button onClick={logout}>Log Out</button> */}
            <br></br>
            <h5 id="user">You are signed in as {props.user.email} wooo!</h5>
            <LookupForms />
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Card className={classes.root} elevation={6}>
                    <CardContent className={classes.cardTitles}>
                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                            Your Favorites
                            </Typography>

                    </CardContent>
                    {(state.lists.length === 0) ? <div>Create a list above and save to your favorites!</div> :
                        <ul>
                            {state.lists.map(list => {

                                if (list.favorites.includes(props.user.email)) {
                                    return (
                                        <CardActions>
                                            <Link href="/List">
                                                <Button
                                                    onClick={faveClick}
                                                    type="submit"
                                                    size="small"
                                                    required
                                                    className={classes.button}
                                                    value={list.codename}
                                                >
                                                    {list.listname}
                                                </Button>
                                            </Link>
                                        </CardActions>
                                    )} else {
                                        return null
                                    }
                                }

                            )}
                        </ul>
                    }

                </Card>
            </Container>



        </div >

    );
}
