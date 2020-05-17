import React, { Component, Fragment } from "react"
import Axios from "axios";

export default class AddMerchant extends Component {
    render() {
        return (
            <Fragment>
                <h3 className="alert alert-info">Add Merchant Page title</h3>
                <form className="col-6">

                    <div>
                        <label>Enter Merchant Details:</label>
                        <input className="form-control" type="text" />
                    </div>

                    <br />
                    <button className="btn btn-primary">Add</button>
                </form>
            </Fragment>
        )
    }
}