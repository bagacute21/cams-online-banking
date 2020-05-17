import React, { Component, Fragment } from "react"
import logo from "../images/logo.png"
import "../css/Login.css"
// import Container from 'react-bootstrap/Container'
// import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import ErrorBoundary from "./ErrorBoundary";
import Header from "./Header";
import Axios from "axios";

import Cookies from 'universal-cookie';
const cookies = new Cookies();
// const baseAPIURL = "http://localhost:8051/v1/account/rest-api";
const baseAPIURL = "http://35.202.163.243:8888/v1/account/rest-api";
// const baseAPIURL = "http://onlinebanking-granaderos.apps.us-west-2.online-starter.openshift.com/account-service"
const config = {
    headers: {
        "Content-Type": "application/json"
        
    }
}

    export default class Login extends Component {

        constructor(props) {
            super(props);
    
            this.state = {
              hasError: false,
                loginData: {
                    username: "",
                    password: "",
                },
                userData: {
                    userid: '',
                    username: '',
                    firstname: '',
                    lastname: '',
                    birthdate: '',
                    address: '',
                    gender: '',
                    role: -1
                  }
            }
        }
    
        componentDidMount() {
                 
        }
    
        authenticateLogin = () => {
            var endpoint = "/user/authenticateLogin";
            Axios.get(baseAPIURL+endpoint+"/"+this.state.loginData.username + ", " + this.state.loginData.password)
                .then(res => {
                    if(res.data != null || res.data != "") {
                        this.setState({
                            userData: res.data
                        });
                        console.log("Successfully logged in.");
                        cookies.remove('userid');
                        cookies.remove('role');
                        cookies.set('userid', this.state.userData.userid, { path: '/' });
                        cookies.set('role', this.state.userData.role, { path: '/' });
                        console.log(cookies.get('userid'));
                        window.location.href = "/home";
                    } 
               
                }).catch(err => {
                    alert("Incorrect credentials.");
                    window.location.reload();
                });
        }

        componentDidCatch(error, info) {
            this.setState({hasError: true });
        }

        handleChangeLoginData = (e) => {
            const {name, value} = e.target;
            this.setState((prevState) => ({
                loginData: {
                    ...prevState.loginData,
                    [name]: value
                }
            }))
            console.log(this.state.loginData);
        }

        render() {
            return(
                <div className="login-background container-fluid d-flex h-100">
                    <div className="col">
                        <Header loggedOut={true}/>
                    </div>
                    
                    <div className="login-container row justify-content-center">
                        
                        {/* <div className="login-container-logo"> */}
                            <img src={logo} className="login-logo"/>
                        {/* </div> */}

                        <div className="login-container-form">
                            <div className="row login-form-div justify-content-center">
                                <label className="col-3">Username</label>
                                <input type="text" className="col-5 login-input" onChange={this.handleChangeLoginData} name="username" id="username" />
                            </div>

                            <div className="row login-form-div justify-content-center">
                                <label className="col-3">Password</label>
                                <input type="password" className="col-5 login-input" onChange={this.handleChangeLoginData} name="password" id="password" />

                            </div>

                            <div className="row login-form-div justify-content-center">
                                <input onClick={this.authenticateLogin} type="submit" className="col-3 login-submit"></input>
                            </div>

                        </div>
                    </div>
                </div>
        )
    }
}