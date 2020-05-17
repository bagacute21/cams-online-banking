import React, { Component, Fragment } from "react"
import Axios from "axios";
import UserSideBar from "./UserSideBar";
import Header from "./Header";
import { restElement } from "@babel/types";
import { MDBDataTable, MDBBtn } from 'mdbreact';

import "../css/AdminViewTransactions.css";

const bankTransactionURL = "http://162.133.80.172:8888/transaction-api/rest/transactions/allTransactions";
const merchantTransactionURL = "http://13.90.22.89:8080/v1/merchant/rest-api/transaction";
const phoneTransactionURL = "http://162.133.80.172/phone-service/phoneservice/showAll/";

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export default class AdminViewTransactions extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bankTransactions: [],
            merchantTransactions: [],
            phoneTransactions: []
        }
    }
    
    componentDidMount() {
        this.getBankTransactions();
        this.getMerchantTransactions();
        this.getPhoneTransactions();
    }

    getBankTransactions = () => {
        Axios.get(bankTransactionURL, config)
            .then(res => {
                this.setState({
                    bankTransactions: res.data
                });     

                // console.log("Bank Transactions");
                // console.log(this.state.bankTransactions);      
            });
    }

    getMerchantTransactions = () => {
        Axios.get(merchantTransactionURL, config)
            .then(res => {
                this.setState({
                    merchantTransactions: res.data
                });         
                
                // console.log("Merchant Transactions");
                // console.log(this.state.merchantTransactions);
            });
    }

    getPhoneTransactions = () => {
        Axios.get(phoneTransactionURL, config)
            .then(res => {
                this.setState({
                    phoneTransactions: res.data
                });      
                
                // console.log("Phone Transactions");
                // console.log(this.state.phoneTransactions);
            });
    }

    getFilteredTransactions = () =>
    {
        let filteredTransactions = [];
        let accountnumber = '';
        let type = '';

        // Filter Bank Transactions
        this.state.bankTransactions.map(bankTransaction => 
        {    
            switch (bankTransaction.transactionType)
            {
                case 'deposit':
                {
                    type = "Deposit";
                    accountnumber = bankTransaction.toAccNo;
                    break;
                }

                case 'withdraw':
                {
                    type = "Withdraw";
                    accountnumber = bankTransaction.fromAccNo;
                    break;
                }

                case 'transfer':
                {
                    type = "Transfer";
                    accountnumber = bankTransaction.fromAccNo;
                    break;
                }
            }

            let date = new Date();
            date = bankTransaction.transactionDate.substring(0,10);

            let processedTransaction = 
            {
                transactionid: bankTransaction.transactionID,
                accountnumber: accountnumber,
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
                accountnumber: accountnumber,
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
                    accountnumber: accountnumber,
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

        const data = {
            columns: [
              {
                label: 'Transaction ID',
                field: 'transactionid',
                sort: 'asc',
                // width: 150
              },
              {
                label: 'Account Number',
                field: 'accountnumber',
                sort: 'asc',
                // width: 150
              },
              {
                label: 'Type',
                field: 'type',
                sort: 'asc',
                // width: 270
              },
              {
                label: 'Amount',
                field: 'amount',
                sort: 'asc',
                // width: 200
              },
              {
                label: 'Transaction Date',
                field: 'transactiondate',
                sort: 'asc',
                // width: 100
              }
            ],
            
            rows: this.getFilteredTransactions()
          }

        return (
            <Fragment>
                <div className="row container container-fluid">
                    <div className="col">
                        <UserSideBar />
                        <Header />
                    </div>
                    <div className="col-10 component-content admin-transactions-div">
                        <h3>List of Transactions</h3>
                        <br/>
                        
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