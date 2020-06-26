import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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
    fontSize: '1.75rem',
  },
  appBar: {
    height: "75px",
    backgroundColor: "#f3c623",
    [theme.breakpoints.down('sm')]: {
      backgroundColor: "#f3c623",
    },

  },
  buttonGroup: {
    color: "white",
  },
  logo: {
    [theme.breakpoints.down('sm')]: {
      fontSize: "2.75rem",
      display: "flex",
      // justifyContent: "center",
      // textAlign: "center",
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: "1.75rem",
      display: "flex",
      // justifyContent: "center",
      // textAlign: "center",
    }

  }


}));

export default function ExportAppBar(props) {
  const classes = useStyles();
  return (
    <div >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <a className={classes.logo} style={{ color: 'white' }} href="/home">Check it Out</a>
          </Typography>
          {props.children}
          {/* <Button className="NavButton" color="inherit"><a style={{ color: "white", marginTop: ".2rem" }} href="/home"><FontAwesomeIcon style={{ height: "2rem", width: "2rem" }} icon={props.text1} >></FontAwesomeIcon></a></Button> */}
          {/* <FontAwesomeIcon style={{ height: ".5rem", width: ".5rem" }} icon={faCheck} href={props.link1}>{props.text1}></FontAwesomeIcon>*/}
          <div >
            <ButtonGroup className={classes.buttonGroup} variant="text" aria-label="text button group">
              <Button href="/Home" className={classes.buttonGroup}>Home</Button>
              <Button onClick={props.logout} className={classes.buttonGroup}>LogOut</Button>
            </ButtonGroup>
          </div>

        </Toolbar>

      </AppBar>
    </div>

  );
}