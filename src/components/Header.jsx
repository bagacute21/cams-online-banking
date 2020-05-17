import React, { Component, Fragment } from "react";
import "../css/Header.css";
import ibmlogo from "../images/ibm-logo-white.png";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";

import Login from "./Login";
import ViewProfile from "./ViewProfile";
import Axios from "axios";

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Header extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loggedOut: this.props.loggedOut,
            username: ""
        }
    }

    componentDidMount() {

        var baseURL = "http://35.202.163.243:8888/v1/account/rest-api";
        var endpoint = "/user/getUserByID/"
        Axios.get(baseURL + endpoint + cookies.get('userid')).then(res => {
            // console.log("HEADER USER");
            // console.log(res);
            this.setState({ username: res.data.username });
            // console.log("ACCOUNTS");
            // console.log(this.state.username);
        });
    }

    removeCookies()
    {
        cookies.remove('userid');
        cookies.remove('role');
    }

    signedIn (loggedOut)
    {
        if (loggedOut == undefined) 
        {
            return (
                <Fragment>
                    
                    {/* <div className="header-username">
                        <p className="header-username-p">Username</p>
                    </div> */}

                    <NavLink to="/view-profile" className="header-menulink" >
                        <div className="header-profile header-menubar">
                            <i className="fas fa-user-circle fa-lg header-icon"></i> 
                        </div>
                    </NavLink>

                    <NavLink to="/" className="header-menulink" onClick={this.removeCookies}>
                        <div className="header-logout header-menubar">
                            <i className="fas fa-sign-out-alt header-icon"></i> Logout
                        </div>
                    </NavLink>
                </Fragment>
            );
        }
    }   

    render() {

        let log = this.state.loggedOut;

        return(
            
            <div className="header-div">
                <div className="header-ibm">
                    <h2 className="header-ibm-title">IBM</h2>
                    {/* <img src={ibmlogo} className='header-div-logo'/> */}
                </div>

                {this.signedIn(log)}
            </div>

        )
    }
}

export default Header;