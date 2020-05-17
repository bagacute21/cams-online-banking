import React, { Component, Fragment } from "react"
import Axios from "axios";

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserSideBar from "./UserSideBar";
import Header from "./Header";
import Cookies from 'universal-cookie';
import { Modal, Button } from 'react-bootstrap'
import { MDBDataTable, MDBBtn } from 'mdbreact';
//import { Alert } from 'reactstrap';

import "../css/Merchant.css";

import { showMerchant } from '../util/viewMerch.js';

const cookies = new Cookies();
const baseAPIURL = "http://13.90.22.89:8080/v1/merchant/rest-api/merchant";
// const getEnrolledMerchantsURL = "https://merchantwebservice01.azurewebsites.net/v1/merchant/rest-api/enrolledmerchant";
const getEnrolledMerchantsURL = "http://13.90.22.89:8080/v1/merchant/rest-api/enrolledmerchant/UserId/";
// const getEnrolledMerchantsURL = "http://13.90.22.89:8080/v1/merchant/rest-api/enrolledmerchant/enrolledMerchants";
const postMerchantURL = "http://13.90.22.89:8080/v1/merchant/rest-api/enrolledmerchant/addEnMerchant";
const getTransactionsURL = "http://13.90.22.89:8080/v1/merchant/rest-api/transaction/AccountNumber/";
const postTransactionURL = "http://13.90.22.89:8080/v1/merchant/rest-api/transaction/addTransaction";

// const 

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export default class Merchant extends Component {

    constructor(props) {
        super(props);

        this.state = {
            merchantData: [],
            enrolledMerchantData : [],
            merchantTransactionsData : [],
            accList: [],
            // enrollMerchantDetails : {
            //     merchantId : '',
            //     userId : ''
            // },
            merchantId : '',
            accountNumber : '',
            amount : '',
            merchantname: '',
            bankAccounts: [],
            transactionsList: [],
            enMerchants: []
        };  
        this.handleShowPayMerchantModal = this.handleShowPayMerchantModal.bind(this)
    }
    

    componentDidMount() {
        this.getMerchants();
        this.getEnrolledMerchants();
        this.getAccounts();

        Axios.get('http://35.202.163.243:8888/v1/account/rest-api/account/getByUserid/' + cookies.get('userid')).then(res => {
            console.log(res);
            this.setState({ accList: res.data })
            console.log("ACCOUNTS");
            console.log(this.state.accList);
        });

        this.filterEnrolledMerchants();
    }

    handleShowAddMerchantModal = () => {
        this.setState({ showAddMerchantModal: true });
    }

    handleCloseAddMerchantModal = () => {
        this.setState({ showAddMerchantModal: false });
    }

    //Modal
    handleShowPayMerchantModal = (merchantIdItem, e) => {
        console.log(merchantIdItem);
        this.setState({ 
            showPayMerchantModal: true,
            merchantId : merchantIdItem 
        });
    }

    handleClosePayMerchantModal = () => {
        this.setState({ showPayMerchantModal: false });
    }

    handleChangeModal = (e) => {
        this.setState({ 
            // enrollMerchantDetails: {
                [e.target.name]: e.target.value 
            // } 
        });
    }

    toggleAddBankModal() {
        this.setState({
          showAddBankAccountModal: ! this.state.showAddBankAccountModal
        });
      }

    postAddTransaction = (e) => {
        e.preventDefault();
        const merchantTransaction = {
            accountNumber : this.state.accountNumber,
            amount : this.state.amount,
            merchantId : this.state.merchantId
        }
        Axios.post(postTransactionURL, merchantTransaction, config)
            .then(res => {
                console.log(res.data);
                alert("Merchant Paid!");
                this.getTransactions();
            })
            .catch (function (error) { 
                console.log(error); 
            })
    }

    //GET METHOD
    getMerchants() {
        Axios.get(baseAPIURL)
            .then(res => {
                console.log("Merchant Data = " + JSON.stringify(res.data));
                this.setState({
                    merchantData: res.data
                });
            });
    }

    getEnrolledMerchants(){
        Axios.get(getEnrolledMerchantsURL+cookies.get('userid'))
        .then(res => {
            console.log("Enrolled Merchant Data = " + JSON.stringify(res.data));
            this.setState({
                enrolledMerchantData: res.data
            });
        });
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

    filterEnrolledMerchants()
    {
        const getAllMerchantsURL = "http://13.90.22.89:8080/v1/merchant/rest-api/merchant";

        Axios.get(getAllMerchantsURL)
        .then(res => {

            let list = res.data;

            list.map(merch => {
                this.state.enrolledMerchantData.map(eMerch => {
                    if (merch.merchantId == eMerch.merchantId)
                    {
                        let temp = {
                            enrolledMerchantId: eMerch.enrolledMerchantId,
                            merchantId: eMerch.merchantId,
                            merchantName: merch.merchantName
                        }
        
                        this.setState(prevState => ({
                            enMerchants: [...prevState.enMerchants, temp]
                        }))
                    }
                })
            })
            
        });
    }

    getTransactions(accountnumber) 
    {
        Axios.get(getTransactionsURL+accountnumber)
        .then(res => {

            let list = res.data;

            list.map(transaction => {

                let temp = {
                    accountNumber: transaction.accountNumber,
                    amount: transaction.amount,
                    merchantId: transaction.merchantId,
                    toAccNo: transaction.toAccNo,
                    transactionDate: transaction.transactionDate,
                    transactionId: transaction.transactionId
                }

                this.setState(prevState => ({
                    transactionsList: [...prevState.transactionsList, temp]
                }))
            })
            
        });
    }

    handleChangeMerchant = (e) => {
        this.setState({ 
            // enrollMerchantDetails: {
                [e.target.name]: e.target.value 
            // } 
        });
    }

    // POST METHOD
    postEnrollMerchant = (e) => {
        e.preventDefault();
        const enrollMerchant = {
            merchantId : this.state.merchantId,
            userId : cookies.get('userid')
        }
        Axios.post(postMerchantURL, enrollMerchant, config)
        // Axios.post(postMerchantURL, this.state.enrollMerchantDetails, config)
            .then(res => {
                console.log(res.data);
                alert("Merchant Enrolled!");
                this.getEnrolledMerchants();
            })
            .catch (function (error) { 
                console.log(error); 
            })
        // console.log("after post");
        // console.log(this.state.enrollMerchantDetails);
        
    }

    posAddMerchant = (e) =>
    {
        e.preventDefault();
        const endpoint = "/addMerchant";
        const merchant = {
            merchantName: this.state.merchantname
        }
        // console.log(merchantName);
        Axios.post(baseAPIURL+endpoint, merchant, config)
        .then(res => {
            console.log("Added NEW Merchant");
            console.log(res.data);
            this.handleCloseAddMerchantModal();
            alert('You successully added a merchant!');
            this.getMerchants();
        });
        
    }


    checkRole()
    {
        console.log(cookies.get('role'));
        if (cookies.get('role') == 0)
        {
            const data = {
                columns: [
                  {
                    label: 'Merchant ID',
                    field: 'merchantid',
                    sort: 'asc'
                  },
                  {
                    label: 'Merchant Name',
                    field: 'merchantname',
                    sort: 'asc',
                    width: 350
                  }
                ],
                
                rows: this.state.merchantData
              }

            console.log("MERCHANT NAMEEEEEEE");
              console.log(this.state.merchantname);

            return(
                <div className="col-8 component-content merchant-div admin-merchant-div">
                    <h3>List of Merchants</h3>

                    <button className="btn btn-link" onClick={this.handleShowAddMerchantModal} data-toggle="tooltip" data-placement="top" title="Add Merchant"><i className="fas fa-user-plus"></i></button>  

                    {/* DATA TABLE */}
                    <MDBDataTable
                        hover
                        sortable
                        data={data}
                        scrollY
                    />

                    {/* ADD MERCHANT MODAL */}
                    <Modal show={this.state.showAddMerchantModal} onHide={this.handleCloseAddMerchantModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Merchant</Modal.Title>
                        </Modal.Header>

                        <Modal.Body>
                            <div>
                                <label>Merchant Name: <sup>*</sup></label>
                                <input type="text" className="form-control" name="merchantname"  onChange={this.handleChangeMerchant} required />
                            </div>
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" className="btn btn-success btn-md" role="alert" onClick={this.posAddMerchant} value={this.state.merchantname}>
                                Add Merchant
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            );
        }

        else
        {
            console.log("ENROLLED MERCHANTS ");
            console.log(this.state.enMerchants);
            return(
                <div className="col-8 component-content merchant-div">
                    <h3 className="alert alert-info">Your Merchants</h3>
                    <form className="col-6">
                        <div className="form-group">
                            <label className="label">Select your Merchant:</label>
                            <select className="form-control" name="merchantId" onChange={this.handleChangeMerchant}>
                                <option selected disabled>Select Merchant</option>

                                {this.state.merchantData.map(addMerchant => 
                                    <option key={addMerchant.merchantId} value={addMerchant.merchantId}>{addMerchant.merchantName}</option>
                                )}
                            </select>

                            <br />

                            {/* post method enrolledmerchant */}
                            <button className="btn btn-primary" type="submit" onClick={this.postEnrollMerchant}>ENROLL MERCHANT</button>
                        </div>
                    </form>

                    <br />

                    <div>Your List of Enrolled Merchants</div>

                    <table className="table table-hover" id='MerchantTable'>
                        <thead>
                            <tr>
                                <th>Enrolled Merchant ID</th>
                                <th>Merchant ID</th>
                                <th>Merchant Name</th>
                                <th>Action</th>
                                
                            </tr>
                        </thead>

                        <tbody>
                        
                        {this.state.enMerchants.map((enrolledMerchant, index) => {
                                let handleShowPayMerchantModal = this.handleShowPayMerchantModal.bind(this, enrolledMerchant.merchantId);
                                return (
                                        <tr key={index}>
                                            <td>{enrolledMerchant.enrolledMerchantId}</td>
                                            <td>{enrolledMerchant.merchantId}</td>
                                            <td>{enrolledMerchant.merchantName}</td>
                                            
                                            <td>
                                                <button className="btn btn-success btn-sm" onClick={handleShowPayMerchantModal} >
                                                    PAY MERCHANT
                                                </button>
                                            </td>
                                        </tr>
                                )
                        })}

                        </tbody>
                    </table>

                    <Modal show={this.state.showPayMerchantModal} onHide={this.handleClosePayMerchantModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Pay Merchant</Modal.Title>
                        </Modal.Header>
                        
                        <Modal.Body>
                        
                            <div className="form-group" >
                                <label for="inputAccountNumber">Account Number <sup>*</sup></label>


                                <select name="accountNumber" className="form-control" onChange={this.handleChangeModal}>
                                    <option selected disabled>Select account number</option>

                                    {/* mapping */}
                                    {this.state.accList.map ( (account) =>
                                        <option key={account.accountnumber} name="accountNumber" value={account.accountnumber}>
                                            {account.accountnumber}
                                        </option>
                                        )}
                                </select>
                            </div>

                            <div>
                                <label>Amount: <sup>*</sup></label>
                                <input type="text" className="form-control" name="amount"  onChange={this.handleChangeModal} required />
                            </div>
                        
                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" className="btn btn-success btn-md" role="alert" type="submit" onClick={this.postAddTransaction} value={this.state.merchantId}>
                                Pay
                            </Button>
                        </Modal.Footer>
                        
                    </Modal>
                
                    <div>Your List of Transactions</div>

                        <table className="table table-hover" id='TransactionsTable'>
                            <thead>
                                <tr>
                                    <th>Transaction ID</th>
                                    {/* <th>Transaction Date</th> */}
                                    <th>Merchant ID</th>
                                    {/* <th>Merchant Name</th> */}
                                    <th>Account Number</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>

                            <tbody>
                            
                            {this.state.transactionsList.map(transaction => {
                            
                                    return (
                                            <tr>
                                                <td>{transaction.transactionId}</td>
                                                {/* <td>{transaction.transactionDate}</td> */}
                                                {/* <td>GENERATE DATE</td> */}
                                                <td>{transaction.merchantId}</td>
                                                {/* <td>MERCHANT NAME</td> */}
                                                <td>{transaction.accountNumber}</td>
                                                <td>{transaction.amount}</td>
                                            </tr>
                                    )
                            })}

                            </tbody>
                        </table>
                </div>
            );
        }
    }
    

    render() {
        // console.log(this.state.enrollMerchantDetails);
        console.log("accountNumber: " + this.state.accountNumber);
        console.log("amount: " + this.state.amount);
        console.log("merchantId: " + this.state.merchantId);

        return (
            <Fragment>

                <div className="row container container-fluid">

                    <div className="col">
                        <Header loggedIn={true}/>
                        <UserSideBar />
                    </div>

                    {this.checkRole()}

                </div>

            </Fragment>
        )
    }
}
