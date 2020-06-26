import React from "react"
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
// import AppBar from 'material-ui/AppBar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import AppBar from "../AppBar"
// from '@material-ui/core/CssBaseline';
import "./style.css"

export function SignInComponent() {
    return (
        <div>
            <MuiThemeProvider>
                <div>
                    <AppBar
                        title="Login"
                    />
                    <form id="signupForm" className="signInContainer">
                        <input
                            // onChange={(event, newValue) => this.setState({ username: newValue })}
                            placeholder="Enter Email"
                            id="signupEmail"
                        />
                        <br />
                        <input
                            type="password"
                            // onChange={(event, newValue) => this.setState({ password: newValue })}
                            placeholder="Enter Password"
                            id="signupPassword"
                        />
                        <br />
                        <button 
                        style={style} 
                        id="signupButton" 
                        className="btn waves-effect waves-light" 
                        type="button" 
                        onClick={console.log("hellooo?")}
                        >
                            Sign Up
    
                        </button>
                    </form>
                    <div className="signInContainer">
                        <input
                            // onChange={(event, newValue) => this.setState({ username: newValue })}
                            placeholder="Enter Email"
                            id="loginEmail"
                        />
                        <br />
                        <input
                            type="password"
                            // onChange={(event, newValue) => this.setState({ password: newValue })}
                            placeholder="Enter Password"
                            id="loginPassword"
                        />
                        <br />
                        <button style={style} className="btn waves-effect waves-light" type="submit" name="action">Log In
    
                        </button>
                    </div>
                </div>

            </MuiThemeProvider>
        </div>
    );
}
const style = {
    backgroundColor: "white",
};