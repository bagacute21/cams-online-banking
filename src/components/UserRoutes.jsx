import React, { Component, Fragment } from "react"
import { BrowserRouter as Router, Route } from "react-router-dom";

import Withdraw from "./Withdraw";
import Deposit from "./Deposit";
import Transfer from "./Transfer";
import ViewTransactions from "./ViewTransactions";

import ChooseTransactions from "./ChooseTransactions" ;

import Home from "./Home";
import LoadPhone from "./LoadPhone";
import Summary from "./Summary";

import Merchant from "./Merchant";
import PayMerchant from "./PayMerchant";
import ViewProfile from "./ViewProfile";
import ListofUsers from "./ListofUsers";
import Login from "./Login";

import AdminViewTransactions from "./AdminViewTransactions";

class UserRoutes extends Component {
    render() {
        return(
            <Router>
                <Fragment>

                    <Route
                        path="/home"
                        exact component={Home}
                    />

                    <Route
                        path="/load-phone"
                        exact component={LoadPhone}
                    />

                    <Route
                        path="/summary"
                        exact component={Summary}
                    />

                    <Route
                        path="/choose-transactions"
                        exact component={ChooseTransactions}
                    />

                    <Route 
                        path="/withdraw" 
                        exact component={Withdraw} 
                    />

                    <Route 
                        path="/deposit" 
                        exact component={Deposit}
                    />

                    <Route 
                        path="/transfer" 
                        exact component={Transfer} 
                    />

                    <Route 
                        path="/transactions" 
                        exact component={ViewTransactions} 
                    />

                    <Route 
                        path="/merchant" 
                        exact component={Merchant} 
                    />  

                    <Route 
                        path="/pay-merchant" 
                        exact component={PayMerchant}
                    />
 
            {/* admin side */}
                    <Route
                        path="/listofusers"
                        exact component={ListofUsers}
                    />

                    <Route
                        path="/view-profile" 
                        exact component={ViewProfile}
                    />

                    <Route
                        path="/"
                        exact component={Login}
                    />

                    <Route
                        path="/admin-view-transactions"
                        exact component={AdminViewTransactions}
                    />
                </Fragment>
            </Router> 
        )
    }
}

export default UserRoutes;