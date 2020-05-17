import React, { Component, Fragment } from "react"
import Axios from "axios";
import Cookies from 'universal-cookie';

import UserSideBar from "./UserSideBar";
import Header from "./Header";

import "../css/Withdraw.css";

// const baseAPIURL = "http://localhost:8051/v1/account/rest-api";
const baseAPIURL = "http://35.202.163.243:8888/v1/account/rest-api";
// const baseAPIURL = "http://onlinebanking-granaderos.apps.us-west-2.online-starter.openshift.com/account-service";

const cookies = new Cookies();

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export default class Withdraw extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: 100101,
            bankAccounts: [],
            withdrawData: {
                transactionID: "TRS1",
                transactionDatess: "2017-03-30T16:00:00.000+0000",
                transactionType: "withdraw",
                fromAccNo: "ACC100FF10",
                toAccNo: "ACC100FF10",
                amount: 1000,
                balance: 8000,
                userId: cookies.get("userid")
            }
        }
    }

    componentDidMount() {
        // call function to display all user's accounts in the select options
        this.getBankAccounts();
    }

    getBankAccounts = () => {
        var endpoint = "/account/getByUserid";
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

    postWithdraw = () => {
        // const depositURL = "http://localhost:8052/transaction-api/rest/transactions/add";
        // var withdrawURL = "http://localhost:8052/transaction-api/rest/transactions/add?transactionType=withdraw&fromAccNo="+this.state.withdrawData.fromAccNo+"&amount="+this.state.withdrawData.amount+"&userId="+this.state.withdrawData.userId;
        var withdrawURL = "http://162.133.80.172:8888/transaction-api/rest/transactions/add?transactionType=withdraw&fromAccNo="+this.state.withdrawData.fromAccNo+"&amount="+this.state.withdrawData.amount+"&userId="+this.state.withdrawData.userId;
        Axios.post(withdrawURL, config)
            .then(res => {
                console.log(res.data.entity);
                if(res.data.entity === "Transaction was successful.") {
                    alert("Transaction was successful.\nPhp " + this.state.withdrawData.amount + " was withdrawn from account " + this.state.withdrawData.fromAccNo + ".");
                    window.location.reload();
                }
            });
    }

    handleChangeWithdrawData = (e) => {
        const {name, value} = e.target;
        this.setState((prevState) => ({
            withdrawData: {
                ...prevState.withdrawData,
                [name]: value
            }
        }))
    }

    render() {
        return(
            <Fragment>
                <div className="row container container-fluid">
                    <div className="col">
                        <Header />
                        <UserSideBar />
                    </div>
                    <div className="col-5 component-content withdraw-div">
                        <h3 className="alert alert-info">Withdraw</h3>

                        <div>
                            <label>Withdraw From:</label>
                            <select onChange={this.handleChangeWithdrawData} className="form-control" name="fromAccNo" id="fromAccNo">
                                <option value="0">--- Select ---</option>
                                {
                                    this.state.bankAccounts.map(account => {
                                        return(
                                            <option value={account.accountnumber}>{account.accountnumber}</option>
                                        )
                                    })
                                }
                            </select>

                                <br />

                            <label>Withdraw Amount:</label>
                            <input onChange={this.handleChangeWithdrawData} className="form-control" type="text" name="amount" id="amount" />
                            
                            <br />
                            <button onClick={this.postWithdraw} className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
                
            </Fragment>
        )
    }
}