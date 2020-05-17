import React, { Component, Fragment } from "react"
import Axios from "axios";
import Cookies from 'universal-cookie';
import UserSideBar from "./UserSideBar";
import Balance from "./Balance";
import Header from "./Header";

import "../css/Home.css";

// const baseAPIURL = "http://localhost:8051/v1/account/rest-api";
const baseAPIURL = "http://35.202.163.243:8888/v1/account/rest-api";
// const baseAPIURL = "http://onlinebanking-granaderos.apps.us-west-2.online-starter.openshift.com/account-service"

const cookies = new Cookies();
export default class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userData: {
                "userid": "",
                "username": "",
                "firstname": "",
                "lastname": "",
                "birthdate": "",
                "address": "",
                "gender": "",
                "role": -1
            },
            bankAccounts: [],

        }
    }

    componentDidMount() {
        // cookies.set('userid', this.userData.userid, { path: '/' });
        console.log("User ID = " + cookies.get('userid'));
        this.state.userData.userid = cookies.get('userid');
        this.getUserData();
        this.getBankAccounts();
        
    }

    getUserData = () => {
        var endpoint = "/user/getUserByID";
        Axios.get(baseAPIURL+endpoint+"/"+cookies.get('userid'))
            .then(res => {
                if(res.data != null || res.data != "") {
                    this.setState({
                        userData: res.data
                    });
                    console.log("USER DATA")
                    console.log(this.state.userData);
                } else {
                    alert("Unknown userid.");    
                }
            });
    }

    getBankAccounts = () => {
        var endpoint = "/account/getByUserid";
        Axios.get(baseAPIURL+endpoint+"/"+this.state.userData.userid)
            .then(res => {
                console.log("RESDATA ACCOUNTS");
                console.log(res.data);
                this.setState({
                    bankAccounts: res.data
                });
                console.log("ACCOUNTS DATA")
                console.log(this.state.bankAccounts);
            });
    }

    render() {
        return(
            <Fragment>
                <div className="row container-fluid home-div">
                    <div className="col">
                        <Header />
                        <UserSideBar />
                    </div>
                    <div className="col-10 component-content">
                        <h2>Welcome {this.state.userData.firstname} {this.state.userData.lastname}.</h2>
                        <Balance userData={this.state.userData} />
                    </div>
                </div>
            </Fragment>
        )
    }
}