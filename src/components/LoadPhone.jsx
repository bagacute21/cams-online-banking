import React, { Component, Fragment } from "react"
import Axios from "axios";
import Cookies from 'universal-cookie';
import '../css/LoadPhone.css';

import UserSideBar from "./UserSideBar";
import Header from "./Header";
import { tmpdir } from "os";

const cookies = new Cookies();
const baseAPIURL = "http://162.133.80.172/phone-service/";
const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

export default class LoadPhone extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loadPhoneTransactions: [],
            loadDetails: {
                accountNumber: '',
                phoneNumber: '',
                amount: '',
                type: '',
            },
            network_type: '',
            accList: []
        };
    }

    componentDidMount() {
        this.getAccounts();
    }

    getAccounts()
    {
        Axios.get('http://35.202.163.243:8888/v1/account/rest-api/account/getByUserid/' + cookies.get('userid')).then(res => {

            this.setState({ accList: res.data })

            this.state.accList.map(account => {
                this.getTransactions(account.accountnumber);
            })
        });
    }

    getTransactions(accountnumber) 
    {
        let transactionsURL = "http://162.133.80.172/phone-service/phoneservice/getByAccountNumber/?acctNumber="

        Axios.get(transactionsURL+accountnumber)
        .then(res => {

            let list = res.data;

            list.map(transaction => {

                let temp = {
                    accountNumber: transaction.accountNumber,
                    amount: transaction.amount,
                    phoneNumber: transaction.phoneNumber,
                    type: transaction.type
                }

                this.setState(prevState => ({
                    loadPhoneTransactions: [...prevState.loadPhoneTransactions, temp]
                }))
            })
        });
    }

    //loadPhone
    postLoadPhone = (e) => {
        e.preventDefault();
        const reqURL = 'http://162.133.80.172/phone-service/phoneservice/loadPhone/';
        Axios.post(reqURL, this.state.loadDetails, config)
            .then(res => {
                alert("You have successfully loaded " + this.state.loadDetails.phoneNumber + " with " + this.state.loadDetails.amount + " using account " + this.state.loadDetails.accountNumber + "!");
                this.getAccounts();
                // Axios.get('http://162.133.80.172/phone-service/phoneservice/showAll/').then(res => {
                //     this.setState({ loadPhoneTransactions: res.data })
                //     this.setState({
                //         loadDetails: {
                //             accountNumber: '',
                //             phoneNumber: '',
                //             amount: '',
                //             type: ''
                //         }
                //     });
                // });
            });        
    }

    handleChangeLoadPhoneData = (e) => {
        const { name, value } = e.target;
        this.setState((prevState) => ({
            loadDetails: {
                ...prevState.loadDetails,
                [name]: value
            }
        }))
    }

    handleChangeNumber = (e) => {

        const { name, value } = e.target;
        this.setState((prevState) => ({
            loadDetails: {
                ...prevState.loadDetails,
                [name]: value
            }
        }))

        let globe = ["0904", "0905", "0906", "0915", "0917", "0926", "0927",
         "0935", "0936", "0937", "0945", "0956", "0965", "0966", "0967", 
         "0976", "0977", "0978", "0994", "0995", "0997" , "0955" ];
        let smart = ["0908", "0911", "0913", "0914", "0918", "0919", "0928",
         "0929", "0939", "0947", "0949", "0961", "0970", "0981", "0989", 
         "0998", "0999" ];
        let sun = ["0922", "0923", "0924", "0925", "0931", "0932", "0933",
         "0934", "0941", "0942", "0943", "0944" ];
        let tnt = ["0907", "0909", "0910", "0912", "0930", "0938", "0946", 
        "0948", "0950"];

        this.setState({network_type: ""});

        let pnum = e.target.value;
        let pnum_checker = pnum.substring(0, 4);

        if (globe.includes(pnum_checker))
        {
            this.setState({ network_type: "Globe/TM" });
        }
        
        else if (smart.includes(pnum_checker))
        {      
            this.setState({ network_type: "Smart" });
        }
        
        else if(sun.includes(pnum_checker))
        {
            this.setState({network_type: "Sun Cellular"})
        }
        
        else if(tnt.includes(pnum_checker))
        {
            this.setState({network_type: "Talk 'N Text"})
        }

        this.setState((prevState) => ({
            loadDetails: {
                ...prevState.loadDetails,
                type: prevState.network_type
            }
        }))
    }

    render() {

        return (
            <Fragment>
                <div className="row container container-fluid">

                    <div className="col">
                        <UserSideBar />
                        <Header />
                    </div>

                    <div className="col-7 component-content load-phone-div">
                        <h3 className="alert alert-info">Load Phone Page</h3>
                        <form>

                            <div className="form-group">
                                <label for="inputAccountNumber">Account Number</label>


                                <select name="accountNumber" className="form-control" onChange={this.handleChangeLoadPhoneData}>
                                    <option selected disabled>Select account number</option>

                                    {/* mapping */}
                                    {this.state.accList.map ( (acct) =>
                                        <option key={acct.accountnumber} name="acct_no" value={acct.accountnumber}>
                                            {acct.accountnumber}
                                        </option>
                                        )}
                                </select>
                            </div>


                            <div className="form-group">
                                <label for="inputPhoneNumber">Phone Number</label>
                                <input name="phoneNumber" type="number" className="form-control" id="inputPhoneNumber" placeholder="Phone Number" onChange={this.handleChangeNumber}></input>
                            </div>

                            <div className="form-group">
                                <label for="inputLoadAmount">Load Amount</label>
                                <input name="amount" type="number" className="form-control" id="inputLoadAmount" onChange={this.handleChangeLoadPhoneData}></input>
                            </div>

                            <div className="form-group">
                                <label for="inputType">Type</label>
                                <input name="type" type="text" className="form-control" id="inputType" placeholder="Type" placeholder="Network" value={this.state.network_type} disabled ></input>
                            </div>

                            <button onClick={this.postLoadPhone} type="submit" className="btn btn-primary">Load</button>
                        </form>

                        <br />

                        <div>Your List of Load Phone Transactions</div>

                        <table className="table table-hover" id='LoadPhoneTable'>
                            <thead>
                                <tr>
                                    <th>Account Number</th>
                                    <th>Phone Number</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                </tr>
                            </thead>

                            <tbody>
                                {this.state.loadPhoneTransactions.map(loadPhone => {
                                    return (
                                        <tr>
                                            <td>{loadPhone.accountNumber}</td>
                                            <td>{loadPhone.phoneNumber}</td>
                                            <td>{loadPhone.amount}</td>
                                            <td>{loadPhone.type}</td>
                                        </tr>
                                    )
                                })}

                            </tbody>
                        </table>

                    </div>
                </div>
            </Fragment>

        )
    }
}