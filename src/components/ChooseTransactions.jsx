import React, { Component, Fragment } from "react"
import Col from 'react-bootstrap/Col';
import Axios from "axios";

import Moment from 'moment';

import UserSideBar from "./UserSideBar";
import Header from "./Header";
import "../css/Transactions.css";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { MDBDataTable, MDBBtn } from 'mdbreact';

import Cookies from "cookie-universal";
const cookies = new Cookies();

const getTransactionsURL = "http://162.133.80.172:8888/transaction-api/rest/transactions/allTransactions";

export default class chooseTransactions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactionsList : [],
            bankAccounts: []
        }
    }

    componentDidMount() {
        this.getAccounts();
    } 

    getAccounts()
    {
        const getAccountsURL = "http://35.202.163.243:8888/v1/account/rest-api";
        var endpoint = "/account/getByUserid";

        Axios.get(getAccountsURL+endpoint+"/"+cookies.get('userid'))
        .then(res => {

            this.setState({
                bankAccounts: res.data
            });

            this.state.bankAccounts.map(account => {
                this.getTransactions(account.accountnumber);
            })
        });
    }
    
    getTransactions(accountnumber) 
    {
        let transactionsURL = "http://162.133.80.172:8888/transaction-api/rest/transactions/"

        Axios.get(transactionsURL+accountnumber)
        .then(res => {

            let list = res.data;

            list.map(transaction => {

                let temp = {
                    amount: transaction.amount,
                    balance: transaction.balance,
                    fromAccNo: transaction.fromAccNo,
                    toAccNo: transaction.toAccNo,
                    transactionDate: transaction.transactionDate,
                    transactionID: transaction.transactionID,
                    transactionType: transaction.transactionType
                }

                this.setState(prevState => ({
                    transactionsList: [...prevState.transactionsList, temp]
                }))
            })
            
        });
    }

    getFilteredTransactions() {
        let filteredTransactionsList = [];
        let type = '';

        this.state.transactionsList.map(transaction => 
            {
                switch (transaction.transactionType)
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

                let processedTransaction = 
                {
                    transactionDate : transaction.transactionDate.substring(0,10),
                    transactionType : type,
                    fromAccount : transaction.fromAccNo,
                    toAccount : transaction.toAccNo,
                    amount : transaction.amount
                }
    
                filteredTransactionsList.push(processedTransaction);
            });
    
            return filteredTransactionsList;
    }
    
    render() {
        const data = {
            columns: [
              {
                label: 'Transaction Date',
                field: 'transactionDate',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Transaction Type',
                field: 'transactionType',
                sort: 'asc',
                width: 150
              },
              {
                label: 'From Account',
                field: 'fromAccNo',
                sort: 'asc',
                width: 120
              },
              {
                label: 'To Account',
                field: 'toAccNo',
                sort: 'asc',
                width: 120
              },
              {
                label: 'Amount',
                field: 'amount',
                sort: 'asc',
                width: 100
              }
            ],
            
            rows: this.getFilteredTransactions()
          }

        return (
            <Fragment>

                <div className="row container-fluid">


                    <div className="col">
                        <Header />
                        <UserSideBar />
                    </div>

                    <div className="choose-transactions-div">
                        <Col className="card-position" md="3.5">
                            <div className="card m-5 cards-col">
                                <div className="card-body">
                                    <h5 className="card-title">DEPOSIT</h5>
                                    <Link to="/deposit" className="card-link">Proceed</Link>
                                </div>
                            </div>
                        </Col>

                        <Col className="card-position" md="3.5">
                            <div className="card m-5 cards-col">
                                <div className="card-body">
                                    <h5 className="card-title">WITHDRAW</h5>
                                    <Link to="/withdraw" className="card-link">Proceed</Link>
                                </div>
                            </div>
                        </Col>

                        <Col className="card-position" md="3,5">
                            <div className="card m-5 cards-col">
                                <div className="card-body">
                                    <h5 className="card-title">FUND TRANSFER</h5>
                                    <Link to="/transfer" className="card-link">Proceed</Link>
                                </div>
                            </div>
                        </Col>
                    
                    </div>

                    <div className=" list-of-transactions-div">
                        <h3>List of Transactions</h3>
                        <MDBDataTable
                            hover
                            sortable={true}
                            order={'transactionDate', 'asc'}
                            data={data}
                            scrollY
                        />
                    </div>
                
                
                </div>
                
            </Fragment >
        )
    }
}