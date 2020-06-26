// https://git.heroku.com/shopalot-checkitout.git

import React, { Component } from "react";
// import {SignInComponent} from "../components/SignInComponent"
import { Link } from "react-router-dom"
import fire from "../config/fire"
import "./SignInPage.css"
import AppBar from "../components/AppBar"
import { faHome } from '@fortawesome/free-solid-svg-icons';


class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this)
        this.state = {
            email:"",
            password:"",
        }
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u)=>{
            console.log(u)
        }).catch((error => {
            console.error();
        }))
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    signup(e) {
        e.preventDefault();
        //Password has to be at least 6 characters long!
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) =>{
            console.log(u)
        }).catch((error) => {
            console.error();
        })
    }

    render() {
        return (
            <>
            <AppBar link1="/" text1={faHome}>
            </AppBar>
            <br></br>
            <div id="formContainer" className="col-md-6">
                <form>
                    <div class="form-group">
                        <h4 for="exampleInputEmail1">Email Address</h4>
                        <input value={this.state.email} onChange={this.handleChange} type="email" name="email"
                        className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                        placeholder="Enter email" />
                        <small id="emailHelpp" className="form-text">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <h4 for="exampleInputPassword1">Password</h4>
                        <input value={this.state.password} onChange={this.handleChange} type="password"
                        name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                    </div>
                    <button type="submit" onClick={this.login} className="btn btn-primary">Login</button>
                    <button type="submit" onClick={this.signup} style={{marginLeft: "25px"}} className="btn btn-success">Signup</button>
                </form>
            </div>

            </>
        );
    }
}
export default SignInPage
