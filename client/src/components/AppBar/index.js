import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: "center",
    fontSize: '2rem',
  },
  appBar: {
    height: "75px",
    backgroundColor: "#f3c623",
    [theme.breakpoints.down('sm')]: {
      backgroundColor: "#f3c623",
    },

  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      fontSize: "2.75rem", 
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "1.75rem", 
      display: "flex",
      justifyContent: "center",
      textAlign: "center",
    }

  }


}));

export default function ButtonAppBar(props) {
  const classes = useStyles();
  return (
    <div >
      <AppBar position="static">
        {/* <Toolbar> */}
          <Typography variant="h6" className={classes.title}>
            <a className={classes.logo} style={{ color: 'white' }} href="/home">Check it Out</a>
          </Typography>
          {/* {props.children}
          <Button className="NavButton" color="inherit"><a style={{ color: "white", fontSize: '1rem', fontFamily: "Roboto" }} href={props.link1}>{props.text1}</a></Button>        */}
        {/* </Toolbar> */}
      </AppBar>
    </div>

  );
}