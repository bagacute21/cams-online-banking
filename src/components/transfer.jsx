import React, { Component, Fragment } from "react"
import Axios from "axios";
import $ from "jquery";
import Cookies from 'universal-cookie';

import UserSideBar from "./UserSideBar";
import Header from "./Header";

import "../css/Transfer.css";

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
window.$ = window.jQuery = $;
const cookies = new Cookies();
// const baseAPIURL = "http://localhost:8051/v1/account/rest-api";
const baseAPIURL = "http://35.202.163.243:8888/v1/account/rest-api";
// const baseAPIURL = "http://onlinebanking-granaderos.apps.us-west-2.online-starter.openshift.com/account-service";
const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export default class Transfer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: 100101,
            bankAccounts: [],
            transferData: {
                transactionType: "transfer",
                fromAccNo: "",
                toAccNo: "",
                amount: 0,
                userId: cookies.get("userid")
            }
        }
    }

    componentDidMount() {
        $("#divTransferToOwnAccount").hide();
        $("#divTransferToThirdPartyAccount").hide();

        this.getBankAccounts();
    }

    getBankAccounts = () => {
        var endpoint = "/account/getByUserid";
        console.log("USER ID = " + cookies.get("userid"));
        Axios.get(baseAPIURL+endpoint+"/"+cookies.get("userid"))
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

    postTransfer = () => {
        console.log("fromAccNo: " + this.state.transferData.fromAccNo);
        console.log("toAccNo: " + this.state.transferData.toAccNo);

        var transferURL = "http://162.133.80.172:8888/transaction-api/rest/transactions/add?transactionType=transfer&fromAccNo="+this.state.transferData.fromAccNo+"&toAccNo="+this.state.transferData.toAccNo+"&amount="+this.state.transferData.amount+"&userId="+this.state.transferData.userId;
        console.log("AMOUNT TO TRANSFER: " + this.state.transferData.amount); 
        Axios.post(transferURL, config)
            .then(res => {
                console.log(res.data.entity);
                if(res.data.entity === "Transaction was successful.") {
                    alert("Transaction was successful.\nPhp " + this.state.transferData.amount + " was transfered from account " + this.state.transferData.fromAccNo + " to account " + this.state.transferData.toAccNo + ".");
                    window.location.reload();
                }
            });
    }

    handleChangeTransferData = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => ({
            transferData: {
                ...prevState.transferData,
                [name]: value
            }
        }))
        // console.log(this.state.transferData);
    }

    handleChangeTransferTo = () => {
        if($("#transferToOption").val() === "0") {
            $("#divTransferToOwnAccount").show("slow");
            $("#divTransferToThirdPartyAccount").hide();
        } else if($("#transferToOption").val() == 1) {
            $("#divTransferToOwnAccount").hide();
            $("#divTransferToThirdPartyAccount").show("slow");
        } else {
            $("#divTransferToOwnAccount").hide();
            $("#divTransferToThirdPartyAccount").hide();
        }
    }

    render() {
        console.log(this.state.transferData);
        return(
            <Fragment>
                <div className="row container container-fluid">
                    <div className="col">
                        <Header />
                        <UserSideBar />
                    </div>
                    <div className="col-5 component-content transfer-div">
                        <h3 className="alert alert-info">Transfer Fund</h3>
                        <div>
                            <label>Transfer From:</label>
                            <select onChange={this.handleChangeTransferData} className="form-control" name="fromAccNo" id="transferFrom">
                                <option value="0">--- Select ---</option>
                                {
                                    this.state.bankAccounts.map(account => {
                                        return(
                                            <option key={account.accountnumber} value={account.accountnumber}>{account.accountnumber}</option>
                                        )
                                    })
                                }
                            </select>
                                <br />
                            <label>Transfer Amount:</label>
                            <input onChange={this.handleChangeTransferData} className="form-control" type="text" name="amount" id="amount" />
                                <br />
                            <label>Transfer To:</label>
                            <select onChange={this.handleChangeTransferTo} className="form-control" name="transferToOption" id="transferToOption">
                                <option value="-1">--- Choose ---</option>
                                <option value="0">Own Account</option>
                                <option value="1">Other Person's Account</option>
                            </select>

                            {/* When Own Account is chosen. */}
                            <div id="divTransferToOwnAccount">
                            <br />
                                <label>Select an account:</label>
                                <select onChange={this.handleChangeTransferData} className="form-control" name="toAccNo" id="toAccNo">
                                    <option >--- Select ---</option>
                                    {
                                        this.state.bankAccounts.map(account => {
                                            return(
                                                <option key={account.accountnumber} value={account.accountnumber}>{account.accountnumber}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>

                            {/* When third party account */}
                            <div id="divTransferToThirdPartyAccount">
                            <br />
                                <label>Enter Account Number.</label>
                                <input onChange={this.handleChangeTransferData} className="form-control" type="number" name="transferTo" id="transferTo" />
                            </div>

                            <br />
                            <button onClick={this.postTransfer} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>                   
            </Fragment>
        )
    }
}