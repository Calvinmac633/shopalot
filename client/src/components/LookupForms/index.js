import React, { useState, useEffect, useRef } from "react";
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AppBar from "../AppBar";
import "./style.css"
import API from '../../utils/API';
import { REMOVE_LIST, UPDATE_LISTS, LOADING, SET_CURRENT_LIST, ADD_LIST, UPDATE_FAVORITES } from "../../utils/actions"
import { useStoreContext } from "../../utils/GlobalState";
// import { useParams } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
// import { Form, Button } from "react-bootstrap";

import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Form } from "react-bootstrap";
import FavoritesList from "../FavoritesList"

const useStyles = makeStyles((theme) => ({

  root: {
    margin: ".5rem",
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
    color: "blue",
    fontSize: "1.0rem"
  },

  button: {
    padding: 0,
  }
}));

export default function LookupForms() {
  const classes = useStyles();
  const listNameRef = useRef();
  const codeNameRef = useRef();
  const { listname } = useParams();
  const [state, dispatch] = useStoreContext();
  const bull = <span className={classes.bullet}>•</span>;

  const getFavorites = () => {
    dispatch({ type: LOADING });
    dispatch({ type: UPDATE_FAVORITES });
  };

  // const removeFromFavorites = id => {
  //   dispatch({
  //     type: REMOVE_FAVORITE,
  //     _id: id
  //   });
  // };

  useEffect(() => {
    getFavorites();
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    console.log("current listname", listNameRef.current.value)
    API.createList(listNameRef.current.value
    )
      .then(res =>
        window.location.href = "list/" + res.data.codename)
  }

  const handleSubmitCodename = e => {
    e.preventDefault();
    dispatch({ type: LOADING });
    API.getList(codeNameRef.current.value
    )
      .then(res => {
        console.log("This is handleSubmitCodename console log --->", res)
        window.location.href = "list/" + res.data.codename
      }
      )
  }

  return (

    <div>

      <div className={classes.display}>
        <Container component="main" maxWidth="xs">
          {console.log("This is state in the returnnn",state)}
          <CssBaseline />
          <Card className={classes.root} elevation={6}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                create new list
              </Typography>

              <br></br>

              <Form.Control className={classes.form} style={{ fontSize: '1rem', fontFamily: 'Open Sans' }}
                ref={listNameRef}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="codename"
                label="Enter Code Name"
                name="Code Name"
                autoFocus
              />
            </CardContent>
            <CardActions>
              <Link href="/List">
                <Button
                  onClick={handleSubmit}
                  type="submit"
                  size="small"
                  required
                  className={classes.button}
                >
                  let's create
                </Button>
              </Link>
            </CardActions>

          </Card>
        </Container>




        <Container component="main" maxWidth="xs">
          <CssBaseline />


          <Card className={classes.root} elevation={6}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                search existing list
              </Typography>

              <br></br>

              <Form.Control style={{ fontSize: '1rem', fontFamily: 'Open Sans' }}
                className={classes.form}
                ref={codeNameRef}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="codename"
                label="Enter Code Name"
                name="Code Name"
                autoFocus
              />
            </CardContent>
            <CardActions>
              <Link href="/List">
                <Button
                  onClick={handleSubmitCodename}
                  type="submit"
                  size="small"
                  required
                >
                  Let's Search
                </Button>
              </Link>
            </CardActions>

          </Card>
          <FavoritesList />

        </Container>
      </div>
    </div>


  );
}
