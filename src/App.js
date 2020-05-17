import React from 'react';
import logo from './logo.svg';
import Transfer from "./components/Transfer";
import ViewTransactions from "./components/ViewTransactions";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import Login from "./components/Login";
import UserRoutes from "./components/UserRoutes";
import Balance from "./components/Balance";
import LoadPhone from "./components/LoadPhone";
import Summary from "./components/Summary";

import AddMerchant from "./components/AddMerchant";
import EditMerchant from "./components/EditMerchant";

import Merchant from "./components/Merchant";
import PayMerchant from "./components/PayMerchant";

import ViewProfile from "./components/ViewProfile";
import UserSideBar from './components/UserSideBar';
import Footer from './components/Footer';
import "./css/Global.css";
import Header from './components/Header';

function App() {
    // added
    return (

        <div > 
            {/* <Login /> */}
            {/* <Header /> */}
            <UserRoutes />

            <Footer /> 
            { /* <UserSideBar /> */ } {
                /* <ViewTransactions />
                    <Deposit /><br/> <br/>
                    <Withdraw /><br/> <br/>
                    <Transfer /><br/> <br/>


                    <Balance /><br/> <br/>
                    <LoadPhone /><br/> <br/>
                    <Invoice /><br/> <br/>

                    <AddMerchant /> <br/> <br/>
                    <EditMerchant /> <br/> <br/>
                    <EnrollMerchant /> <br/> <br/>
                    <ListEnrolledMerchant /> <br/> <br/>
                    <PayMerchant /> <br/> <br/>

                    <ViewProfile /> <br /> */
            }
        </div>
    );
}

export default App;