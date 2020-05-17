import React, { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link, NavLink } from "react-router-dom";
import "../css/UserSideBar.css";

import logo from "../images/logo.png";
import Cookies from 'universal-cookie';
import ibmlogo from "../images/ibm-logo-white.png";
const cookies = new Cookies();
class UserSideBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            role: 1
        }
    }

    componentDidMount() {
        this.setState({
            role: parseInt(cookies.get("role"))
        })
    }

    checkType(role)
    {
        if (role == 0)
        {
            return (
                
                <Fragment>
                    <li className="nav-item">
                        <NavLink to="/admin-view-transactions" className="sidebar-link">
                        <   i className="fas fa-credit-card sidebar-icon"></i>Transactions
                        </NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink to="/listofusers" className="sidebar-link">
                            <i className="fas fa-users sidebar-icon"></i>List of Users
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/merchant" className="sidebar-link">
                            <i className="fas fa-briefcase sidebar-icon"></i>List of Merchants
                        </NavLink>
                    </li>
                </Fragment>
            );
        }
        
        else
        {
            return (
                <Fragment>

                    <li className="nav-item">
                        <NavLink to="/choose-transactions" className="sidebar-link">
                        <   i className="fas fa-credit-card sidebar-icon"></i>Transactions
                        </NavLink>
                    </li>
                    

                    <li className="nav-item">
                        <NavLink to="/load-phone" className="sidebar-link">
                        <   i className="fas fa-mobile-alt sidebar-icon"></i>Load Phone
                        </NavLink>
                    </li>

                    <li className="nav-item">
                        <NavLink to="/merchant" className="sidebar-link">
                            <i className="fas fa-briefcase sidebar-icon"></i>Merchant
                        </NavLink>
                    </li>
                </Fragment>
            );
        }
    }

    render() {

        // let role = this.state.role;
        let role = parseInt(cookies.get("role"));

        return(
            <nav className="navbar">
                
                <img src={logo} className="sidebar-logo"/>

                <ul className="navbar-nav">
                    
                    <li className="nav-item">
                        <NavLink exact={true} to="/home" className="sidebar-link">
                            <i className="fas fa-home sidebar-icon"></i>Home
                        </NavLink>
                    </li>

                    
    
                    {this.checkType(role)}
                </ul>
            </nav>

        )
    }
}

export default UserSideBar;