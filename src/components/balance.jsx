
import React, { Component, Fragment } from "react"
import Axios from "axios";
import Cookies from 'universal-cookie';
import Col from 'react-bootstrap/Col';

import "../css/Balance.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";


// const baseAPIURL = "http://localhost:8051/v1/account/rest-api";
const baseAPIURL = "http://35.202.163.243:8888/v1/account/rest-api";
// const baseAPIURL = "http://onlinebanking-granaderos.apps.us-west-2.online-starter.openshift.com/account-service"
//test
const cookies = new Cookies();
export default class Balance extends Component {
    constructor(props) {
		super(props);
		this.state = {

            userData: {},
            accountsList: [],
            currBal: ""
		};
    }

    componentDidMount() {
        this.state.userData = this.props.userData;
        this.getUserAccounts();
    }
    
    getUserAccounts = () => {
        console.log("userData");
        console.log(this.state.userData);
        var endpoint = "/account/getByUserid/";
        Axios.get(baseAPIURL+endpoint+cookies.get('userid'))
            .then(res => {
                if(res.data != null || res.data != "") {
                    console.log("outside: " + res.data) 
                    this.setState({
                        accountsList: res.data
                    });
                } else {
                    alert("Unknown userid.");   
                    console.log("getting all accounts. unknown user id: " + res.data) 
                }
            });
    }

    getAccountBalance = (accountnumber, i) => {
        console.log("accountnumber IS");
        console.log(accountnumber);
        var balance = -11;
        var endpoint = "http://162.133.80.172:8888/transaction-api/rest/currentbalance/"
        
        Axios.get(endpoint+accountnumber)
            .then(res => {
                this.setState({
                    balance: res.data
                });
                console.log("CALLED BAL = " + JSON.stringify(res));
                console.log("res.data = " + res.data);
                balance = res.data;
                console.log("BAAAAAL = " + balance);
                // this.state.accountsList.get(i).balance = balance;

                // return balance;
                this.state.currBal = balance;

                console.log("HELLOOOOOOO BALANCEEEEE" + this.state.currBal);
            });
        // return balance;
    }

    setAccoutnumber = (accountnumber) => {
        console.log("called setAccoutnumber = " + accountnumber);
        cookies.remove("accountnumber");
        cookies.set("accountnumber", accountnumber, { path: '/' });
        console.log("ACC NO NOWWW = " + cookies.get("accountnumber"));
    }
    
    render() {
        return(
            <Fragment>
                
                <div className="row container-fluid">
                    {/* <h3>View Balance Page</h3> */}
                    
                    <div className="card-deck">

                        {this.state.accountsList.map((account, index) => {
                            return (
                                <Col xs="12" sm="4">
                                    <div className="card m-3">
                                        <div className="card-body">
                                            <h5 className="card-title">Account No:</h5>
                                            <h6 className="card-subtitle mb-2 text-muted">{account.accountnumber}</h6>
                                            {/* <p className="card-text">Balance:{this.state.currBal}{this.getAccountBalance.call(this, account.accountnumber, index-1)}
                                            </p> */}
                                            <br />
                                            
                                            <Link onMouseOverCapture={(e) => this.setAccoutnumber(account.accountnumber)} to="/transactions"  className="card-link">View Transactions</Link>
                                        </div>
                                    </div>
                                </Col>
                            )})
                        }
                    </div>
                    
                    
                </div>

            </Fragment>
        )
    }
}