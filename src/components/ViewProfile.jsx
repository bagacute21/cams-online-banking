import React, { Component, Fragment } from "react"
import Axios from "axios";
import UserSideBar from "./UserSideBar";
import Header from "./Header";

import "../css/ViewProfile.css";

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const baseAPIURL = "http://35.202.163.243:8888/v1/account/rest-api";

export default class ViewProfile extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData : [],
            accountsList: []
        }
    }

    componentDidMount() {
        this.getUserData();
        this.getAccounts();
    } 

    getUserData()
    {
        var endpoint = "/user/getUserByID";
        Axios.get(baseAPIURL+endpoint+"/"+cookies.get('userid'))
        .then(res => {
            console.log("User Data = " + JSON.stringify(res.data));
            this.setState({
                userData: res.data
            });
        });
    }

    getAccounts()
    {
        var endpoint = "/account/getByUserid";
        Axios.get(baseAPIURL+endpoint+"/"+cookies.get('userid'))
        .then(res => {
            console.log("User Data = " + JSON.stringify(res.data));
            this.setState({
                accountsList: res.data
            });
        });
    }

    getGender()
    {
        if (this.state.userData.gender == 0)
        {
            return "Male";
        }

        else
        {
            return "Female";
        }
    }

    getNumOfAccts()
    {
        var accts = this.state.accountsList;

        return accts.length;
    }

    render() {
        
        return (
            <Fragment>
                <div className="row container container-fluid">
                <div className="col">
                        <Header />
                        <UserSideBar />
                    </div>
                <div className="col-8 component-content view-profile-div">
                <h3 className="alert alert-info">My Profile</h3>

                <form>
                    <div className="form-group">
                        <label for="userID">User ID: </label>
                        <input id="userID" class="form-control" value={this.state.userData.userid} readOnly></input>
                    </div>

                    <div className="form-group">
                        <label for="username">Username: </label>
                        <input id="username" class="form-control" value={this.state.userData.username} readOnly></input>
                    </div>

                    <div className="form-group">
                        <label for="fullName">Full name: </label>
                        <input id="fullName" class="form-control" value={this.state.userData.firstname + " " + this.state.userData.lastname} readOnly></input>
                    </div>

                    <div className="form-group">
                        <label for="address">Address: </label>
                        <input id="address" class="form-control" value={this.state.userData.address} type="text" rows="2" readOnly></input>
                    </div>

                    <div className="form-group">
                        <label for="gender">Gender: </label>
                        <input id="gender" class="form-control" value={this.getGender()} readOnly></input>
                    </div>

                    <div className="form-group">
                        <label for="birthdate">Birthdate: </label>
                        <input id="birthdate" class="form-control" value={this.state.userData.birthdate} readOnly></input>
                    </div>

                    <div className="form-group">
                        <label for="countsAcc">Number of Accounts: </label>
                        <input id="countsAcc" class="form-control" value={this.getNumOfAccts()} readOnly></input>
                    </div>
                </form>
                </div>
                </div>
            </Fragment>
        )
    }
}