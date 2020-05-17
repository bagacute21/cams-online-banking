import React, { Component, Fragment } from "react"
import Axios from "axios";
import $ from "jquery";
import Cookies from 'universal-cookie';
import UserSideBar from "./UserSideBar";
import Header from "./Header";
import "../css/Deposit.css";
window.$ = window.jQuery = $;

// const baseAPIURL = "http://localhost:8051/v1/account/rest-api";
const baseAPIURL = "http://35.202.163.243:8888/v1/account/rest-api";
// const baseAPIURL = "http://onlinebanking-granaderos.apps.us-west-2.online-starter.openshift.com/account-service"

const cookies = new Cookies();

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export default class Deposit extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userId: 100101,
            bankAccounts: [],
            depositData: {
                transactionID: "TRS1",
                transactionDatess: "2017-03-30T16:00:00.000+0000",
                transactionType: "deposit",
                fromAccNo: "ACC100FF10",
                toAccNo: "ACC100FF10",
                amount: 1000,
                balance: 8000,
                userId: cookies.get("userid")
            }
        }
    }

    componentDidMount() {
        $("#divDepositToOwnAccount").hide();
        $("#divDepositToThirdPartyAccount").hide();

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

    postDeposit = () => {
        // const depositURL = "http://localhost:8052/transaction-api/rest/transactions/add";
        // var depositURL = "http://localhost:8052/transaction-api/rest/transactions/add?transactionType=deposit&toAccNo="+this.state.depositData.toAccNo+"&amount="+this.state.depositData.amount+"&userId="+this.state.depositData.userId;
        var depositURL = "http://162.133.80.172:8888/transaction-api/rest/transactions/add?transactionType=deposit&toAccNo="+this.state.depositData.toAccNo+"&amount="+this.state.depositData.amount+"&userId="+this.state.depositData.userId;
        Axios.post(depositURL, config)
            .then(res => {
                console.log(res.data.entity);
                if(res.data.entity === "Transaction was successful.") {
                    alert("Transaction was successful.\nPhp " + this.state.depositData.amount + " was deposited to account " + this.state.depositData.toAccNo + ".");
                    window.location.reload();
                }
            });
    }

    handleChangeDepositData = (e) => {
        var {name, value} = e.target;
        if(name === "amount") value = parseFloat(value);
        this.setState((prevState) => ({
            depositData: {
                ...prevState.depositData,
                [name]: value
            }
        }))
        console.log(this.state.depositData);
    }


    handleChangeDepositTo = () => {
        if($("#depositTo").val() === "0") {
            $("#divDepositToOwnAccount").show("slow");
            $("#divDepositToThirdPartyAccount").hide();
        } else if($("#depositTo").val() == 1) {
            $("#divDepositToOwnAccount").hide();
            $("#divDepositToThirdPartyAccount").show("slow");
        } else {
            $("#divDepositToOwnAccount").hide();
            $("#divDepositToThirdPartyAccount").hide();
        }    
    }

    render() {
        return(
            <Fragment>
                <div className="row container">
                    <div className="col-sm">
                        <Header />
                        <UserSideBar />
                    </div>

                    <div className="col-5 component-content deposit-div">
                        <h3 className="alert alert-info">Deposit</h3>
                        <label className="label">Deposit to:</label>
                        <select onChange={this.handleChangeDepositTo} className="form-control" name="depositTo" id="depositTo">
                            <option value="-1">--- Choose ---</option>
                            <option value="0">Own Account</option>
                            <option value="1">Other Person's Account</option>
                        </select>

                        {/* When Own Account is chosen. */}
                        <div id="divDepositToOwnAccount">
                            <label>Select an account:</label>
                            <select onChange={this.handleChangeDepositData} className="form-control" name="toAccNo" id="toAccNo">
                                {/* <option>Sample Own Account 1</option>
                                <option>Sample Own Account 2</option>
                                <option>Sample Own Account 3</option> */}
                                <option  value="0">--- Select ---</option>
                                {
                                    this.state.bankAccounts.map(account => {
                                        return(
                                            <option value={account.accountnumber}>{account.accountnumber}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>

                        {/* When third party account */}
                        <div id="divDepositToThirdPartyAccount">
                            <label>Enter account number:</label>
                            <input onChange={this.handleChangeDepositData} className="form-control" type="number" name="toAccNo" id="toAccNo" />
                        </div>
                            <br />
                        <label>Deposit amount:</label>
                        <input onChange={this.handleChangeDepositData} className="form-control" type="text" name="amount" id="amount" />
                        <br />
                        <button onClick={this.postDeposit} className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}