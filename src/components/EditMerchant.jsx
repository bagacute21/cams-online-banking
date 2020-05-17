import React, { Component, Fragment } from "react"
import Axios from "axios";

export default class EditMerchant extends Component {
    render() {
        return (
            <Fragment>
                <h3 className="alert alert-info">List of Merchants</h3>

                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th>Merchant ID</th>
                            <th>Merchant Name</th>
                            <th>Action</th>

                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>001</td>
                            <td>Globe Telecom</td>
                            <td><button className="btn btn-primary">Edit</button></td>

                        </tr>
                        <tr>
                            <td>002</td>
                            <td>Meralco</td>
                            <td><button className="btn btn-primary">Edit</button></td>

                        </tr>
                    </tbody>
                </table>
            </Fragment>
        )
    }
}