import React, { Component, Fragment } from "react"
import Axios from "axios";
import UserSideBar from "./UserSideBar";
import ViewProfile from "./ViewProfile";
import Cookies from 'universal-cookie';
import Header from "./Header";
import { MDBDataTable, MDBBtn } from 'mdbreact';

import "../css/ViewTransactions.css";

const cookies = new Cookies();
// const baseURL = "http://onlinebanking-granaderos.apps.us-west-2.online-starter.openshift.com";
// const baseAPIURL = "http://localhost:8052/transaction-api/rest/transactions"
const baseAPIURL = "http://162.133.80.172:8888/transaction-api/rest/transactions";
export default class ViewTransactions extends Component {


    constructor(props) {
        super(props);

        this.state = {
            accountnumber: "",
            balance: "fetching...",
            transactions: [],
            phoneTransactions: [],
            merchantTransactions: []

        }
    }

    componentDidMount() {
        this.setState({
            accountnumber: cookies.get("accountnumber")
        });
        console.log("ACC NOOOOOOOOOOO: " + this.props.accountnumber);

        this.getTransactions();
        this.getPhoneTransactions();
        this.getMerchantTransactions();
        this.getAccountBalance();
    }

    getAccountBalance = () => {
        // var endpoint = "http://localhost:8052/transaction-api/rest/currentbalance/";
        var endpoint= "http://162.133.80.172:8888/transaction-api/rest/currentbalance/";
        Axios.get(endpoint+cookies.get("accountnumber"))
            .then(res => {
                this.setState({balance: res.data});
            });
    }

    getTransactions = () => {
        const endPoint = "/";
        Axios.get(baseAPIURL+endPoint+cookies.get("accountnumber"))
            .then(res => {
                console.log("Transaction Data = " + JSON.stringify(res));
                this.setState({transactions: res.data})
            });
    }

    getPhoneTransactions = () => {
        const phoneTransactionURL = "http://162.133.80.172/phone-service/phoneservice/getByAccountNumber/?acctNumber=";
        Axios.get(phoneTransactionURL+cookies.get("accountnumber"))
            .then(res => {
                console.log("Phone Transaction Data = " + JSON.stringify(res));
                this.setState({phoneTransactions: res.data})
            });
    }

    getMerchantTransactions = () => {
        const merchantTransactionURL = "http://13.90.22.89:8080/v1/merchant/rest-api/transaction/AccountNumber/";
        Axios.get(merchantTransactionURL+cookies.get("accountnumber"))
            .then(res => {
                console.log("Merchant Transaction Data = " + JSON.stringify(res));
                this.setState({merchantTransactions: res.data})
            });
    } 

    getFilteredTransactions = () =>
    {
        let filteredTransactions = [];
        let type = '';

        // Filter Bank Transactions
        this.state.transactions.map(bankTransaction => 
        {    
            switch (bankTransaction.transactionType)
            {
                case 'deposit':
                {
                    type = "Deposit";
                    break;
                }

                case 'withdraw':
                {
                    type = "Withdraw";
                    break;
                }

                case 'transfer':
                {
                    type = "Transfer";
                    break;
                }
            }

            let date = new Date();
            date = bankTransaction.transactionDate.substring(0,10);

            let processedTransaction = 
            {
                transactionid: bankTransaction.transactionID,
                type: type,
                amount: bankTransaction.amount,
                transactiondate: date
            }

            filteredTransactions.push(processedTransaction);
        });

        // Filter Merchant Transactions
        this.state.merchantTransactions.map(merchantTransaction => 
        {    

            let processedTransaction = 
            {
                transactionid: merchantTransaction.transactionId,
                type: "Merchant",
                amount: merchantTransaction.amount,
                transactiondate: merchantTransaction.transactionDate.substring(0,10)
            }

            filteredTransactions.push(processedTransaction);
        });

        // Filter Phone Transactions
        this.state.phoneTransactions.map(phoneTransaction => 
            {    
    
                let processedTransaction = 
                {
                    transactionid: phoneTransaction.transactionId,
                    type: "Load Phone",
                    amount: phoneTransaction.amount,
                    transactiondate: phoneTransaction.transactionDate.substring(0,10)
                }
    
                filteredTransactions.push(processedTransaction);
            });

        // console.log(filteredTransactions);
        return filteredTransactions;
    }

    render() {

        console.log("BALANCE MO " + this.state.balance);

        const data = {
            columns: [
              {
                label: 'Transaction ID',
                field: 'transactionid',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Type',
                field: 'type',
                sort: 'asc',
                width: 100
              },
              {
                label: 'Amount',
                field: 'amount',
                sort: 'asc',
                width: 100
              },
              {
                label: 'Transaction Date',
                field: 'transactiondate',
                sort: 'asc',
                width: 100
              }
            ],
            
            rows: this.getFilteredTransactions()
          }

        return (
            <Fragment>
                <div className="row container container-fluid">
                    <div className="col">
                        <Header />
                        <UserSideBar />
                    </div>
                    <div className="col-8 component-content view-transactions-div">
                        <h3 className="alert alert-info">View Transactions</h3>
                    
                    <div className="container">
                        <div className="form-group">
                            <label>Account number: &nbsp;</label>
                            <strong>{this.state.accountnumber}</strong>
                        </div>
                        <div className="form-group">
                            <label>Available Balance: Php&nbsp;</label>
                            <strong>{this.state.balance}</strong>
                        </div>
                    </div>
                        <MDBDataTable
                            hover
                            sortable={true}
                            // autoWidth
                            order={['transactiondate', 'asc']}
                            data={data}
                            scrollY
                        />
                    </div>
                </div>
            </Fragment>
        )
    }
}