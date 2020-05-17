import React, { Component, Fragment } from "react"
import Axios from "axios";
import '../css/Summary.css';

import UserSideBar from "./UserSideBar";
import Header from "./Header";

export default class Summary extends Component {
    render() {
        return(
            <Fragment>
                <div className="row container container-fluid">
                    <div className="col">
                        <Header />
                        <UserSideBar />
                    </div>             
                {/* <h3>View Invoice Page</h3> */}
                <div className="col-8 component-content summary-div">
                <div class="row">
                   
                    <div class="col">
                        <div>
                            <h2 className="alert alert-info">Summary</h2>
                            <h3>Order #12345</h3>
                        </div>
                        <hr></hr>

                        <div class="row">
                            <div class="col text-left">
                                <address>
                                <strong>Billed To:</strong><br></br>
                                    John Doe<br></br>
                                    Quezon City<br></br>
                                    Philippines<br></br>
                                   
                                </address>
                            </div>

                            <div class="col text-right">
                                <address>
                                <strong>Business Name</strong><br></br>
                                    Globe Telecom<br></br>
                                    1234 Main<br></br>
                                </address>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col text-left">
                                <address>
                                    <strong>Payment Method:</strong><br></br>
                                    Visa ending **** 4242<br></br>
                                    jsmith@email.com
                                </address>

                            </div>

                            {/* <div class="col text-right">
                                <address>
                                    <strong>Order Date:</strong><br></br>
                                    March 7, 2014<br></br>
                                </address>
                            </div> */}
                        
                        </div>

                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <div className="panel">
                            <div className="panel-heading">
                                <h3 className="panel-title"><strong>Payment summary</strong></h3>
                            </div>
                            <div className="panel-body">
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <td><strong>Item</strong></td>
                                                <td className="text-center"><strong>Price</strong></td>
                                                <td className="text-center"><strong>Quantity</strong></td>
                                                <td className="text-right"><strong>Total</strong></td>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            
                                            <tr>
                                                <td>Globe Postpaid Plan</td>
                                                <td className="text-center">1,500.00</td>
                                                <td className="text-center">1</td>
                                                <td className="text-right">1,500.00</td>
                                            </tr>

                                            
                                            <tr>
                                                <td className="thick-line"></td>
                                                <td className="thick-line"></td>
                                                <td className="thick-line text-center"><strong>Total</strong></td>
                                                <td className="thick-line text-right">1,500.00</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                </div>
                </div>
            </Fragment>
        )
    }
}