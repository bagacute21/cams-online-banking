import React, { Component, Fragment } from "react"
import Axios from "axios";

import UserSideBar from "./UserSideBar";
import Header from "./Header";

export default class PayMerchant extends Component {
    render() {
        return (
            <Fragment>
                <div className="row container container-fluid">

                    <div className="col">
                        <Header />
                        <UserSideBar />
                    </div>

                    <div className="col-8 component-content">
                        <h3 className="alert alert-info">Pay Bills</h3>
                        <form className="col-6">

                            <label className="label">Select Account:</label>
                            <select className="form-control" >
                                <option>--Choose--</option>
                                <option>Savings</option>
                                <option>Checkings</option>
                            </select>

                            <div>
                                <label>Transaction Date:</label>
                                <input className="form-control" type="date" />
                            </div>


                            <div>
                                <label>Enter Amount to Pay:</label>
                                <input className="form-control" type="text" />
                            </div>

                            <br />
                            <button className="btn btn-primary">Pay Now</button>
                        </form>
                    </div>
                </div>
            </Fragment>
        )
    }
}