import React, { Component, Fragment } from "react"
import Axios from "axios";
import $ from "jquery";
import UserSideBar from "./UserSideBar";
import Header from "./Header";
import { Modal, Button } from 'react-bootstrap'

import { MDBDataTable, MDBBtn } from 'mdbreact';

import "../css/ListOfUsers.css";

// const baseAPIURL = "https://merchantwebservice01.azurewebsites.net/v1/merchant/rest-api/merchant";
const baseAPIURL = "http://35.202.163.243:8888/v1/account/rest-api";
// const baseAPIURL = "http://onlinebanking-granaderos.apps.us-west-2.online-starter.openshift.com/account-service"

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

window.$ = window.jQuery = $;
export default class ListofUsers extends Component {

    

    constructor(props) {
        super(props);

        this.state = {
            // showEditUserModal: false,
            // showCreateUserModal: false,
            status:'',
            showAddBankAccountModal: false,
            showEditUserModal:false,
            userid: 0,
            creationdate:'',
            
            usersList: [{
                userid: "",
                username: "",
                firstname: "",
                lastname: "",
                role: "",
    
            }],
            accounts: [{
                accountnumber: "",
                userid:"",
                status: "",
                creationdate: "",
                
    
            }],
            
            user: {
                address: '',
                birthdate: '',
                datecreated: '',
                firstname: '',
                gender: '',
                lastname: '',
                password: '',
                role: '',
                status: '',
                userid: '',
                username: ''
              },

              depositData: {
                transactionID: '',
                transactionDatess: '',
                transactionType: '',
                fromAccNo: '',
                toAccNo: '',
                amount: '',
                balance: '',
                userId: ''
            }
        }
    }

    componentDidMount() {
        this.getUsers();
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        that.setState({
        //Setting the value of the date time
        creationdate:
            year + '-' + month + '-' + date + ' ' + hours + ':' + min+':'+sec,
    });
    }

    toggleAddBankModal() {
        this.setState({
          showAddBankAccountModal: ! this.state.showAddBankAccountModal
        });
      }

      toggleEditBankModal() {
        this.setState({
          showEditUserModal: ! this.state.showEditUserModal
        });
      }
    AddBank(userid,firstname,lastname) {
        this.setState({
          user: {userid,firstname,lastname},showAddBankAccountModal: ! this.state.showAddBankAccountModal
        });
      }

      EditBank(address,datecreated,firstname,gender,lastname,password,role,status,userid,username) {
       

        this.setState({
          user: {address,datecreated,firstname,gender,lastname,password,role,status,userid,username},showEditUserModal: ! this.state.showEditUserModal
        });
      }

    // //SHOW EDIT USER MODAL
    // handleShowEditUserModal = () => {
    //     this.setState({ showEditUserModal: true });
    // }
    // handleCloseEditUserModal = () => {
    //     this.setState({ showEditUserModal: false });
    // }

    //SHOW CREATE USER MODAL
    handleShowCreateUserModal = () => {
        this.setState({ showCreateUserModal: true });
        
        
    }
    handleCloseCreateUserModal = () => {
        this.setState({ showCreateUserModal: false });
    }

    
    //SHOW ADD BANK ACCOUNT MODAL
    handleShowAddBankAccountModal = (id) => {
        this.setState(
            { 
            showAddBankAccountModal: true,
            userid: id
            }
        );

    }
    handleCloseAddBankAccountModal = () => {
        this.setState({ showAddBankAccountModal: false });
    }

    // SHOW EDIT USER MODAL
    handleShowEditUserModal = (id) => {
        this.setState({ showEditUserModal: true,
        userid:id });
    }

    handleCloseEditUserModal = (id) => {
        this.setState({ showEditUserModal: false,
        userid: id
        });
    }

    //GET METHOD (USER)
    getUsers() {
        const endpoint = "/user/getUserByRole/1";
        Axios.get(baseAPIURL+endpoint)
            .then(res => {
                console.log("User List = " + JSON.stringify(res.data));
                this.setState({
                    usersList: res.data
                });
            });
    }

    getFilteredUsers = () => {

        let filteredUsersList = [];
        let role = "";
        let status = "";

        this.state.usersList.map(user => 
        {
            if (user.role == 0)
            {
                role = "Admin";
            }

            else
            {
                role = "User";
            }

            if (user.status == 0)
            {
                status = "Active";
            }

            else
            {
                status = "Inactive";
            }

            let processedUser = 
            {
                edit: <button className="btn btn-link" onClick={this.EditBank.bind(this, user.birthdate,user.datecreated,user.firstname,user.gender,user.lastname,user.password,user.role,user.status,user.userid,user.username)} data-toggle="tooltip" data-placement="top" title="add-bank-acct" data-toggle="modal" data-target="addbankaccount" data-whatever="@mdo"><i class="fas fa-edit"></i></button>,
                userid: user.userid,
                username: user.username,
                name: user.firstname + " " + user.lastname,
                role: role,
                status: status,
                action:   <button className="btn btn-link" onClick={this.AddBank.bind(this, user.userid, user.firstname, user.lastname)} data-toggle="tooltip" data-placement="top" title="add-bank-acct" data-toggle="modal" data-target="addbankaccount" data-whatever="@mdo"><i className="fas fa-money-check"></i></button>
            }

            filteredUsersList.push(processedUser);
        });

        return filteredUsersList;
    }


    getUserInfo = (userid) => {
        const endpoint = "/user/getUserByID/";
        Axios.get(baseAPIURL+endpoint+userid)
            .then(res => {
                console.log("USER INFO = " + JSON.stringify(res.data));
                this.setState({
                    user: res.data
                });
            });
    }

    getRoleLabel = (role) => {
        if(role == 0) {
            return "Admin";
        }
        return "Customer";
    }

    getStatusLabel = (status) => {
        if(status == 0) return "Active";
        return "Inactive";
    }

    getSwitchStatus = (status) => {
        if(status == 0) return "checked";
        return "";
    }

    changeUserStatus = (userid) => {
        // this.getUserInfo(userid)
        const endpoint = "/user/getUserByID/";
        Axios.get(baseAPIURL+endpoint+userid)
            .then(res => {
                console.log("USER INFO = " + JSON.stringify(res.data));
                
                this.setState({
                    user: res.data
                });
                var newStatus;
                if(this.state.user.status == 0){
                    newStatus = "Active";
                   
                } else {
                    newStatus = 0;
                    $("#status_switch_"+userid).prop("checked", false);
                }

                this.setState((prevState) => ({
                    user: {
                        ...prevState.user,
                        status: newStatus
                    }
                }))
                console.log("New user INFO = ");
                console.log(this.state.user);
                // update user info
                this.updateUserInfo(userid);
            });
    }   

    //POST METHOD (USER)
    posAddUser = () => {
        const endpoint = "/user/addUser";
        Axios.post(baseAPIURL+endpoint, this.state.user, config)
            .then(res => {
                console.log("Added NEW USER");
                console.log(res.data);
                alert('You successully created a user!');
                this.handleCloseCreateUserModal();
                this.getUsers();
            });
        console.log(this.state.user);
    }

    //POST METHOD (BANK)
    posAddBank = () => {
        const endpoint = "/account/create/";
        Axios.post("http://35.202.163.243:8888/v1/account/rest-api/account/create/"+ this.state.user.userid+"?creationdate="+this.state.creationdate)
            .then(res => {

                var acctNum = res.data;

                console.log(res)
                var depositURL = "http://162.133.80.172:8888/transaction-api/rest/transactions/add?transactionType=deposit&toAccNo="+acctNum+"&amount="+this.state.depositData.amount+"&userId="+this.state.user.userid;
                Axios.post(depositURL, config)
                .then(res => {
                    console.log(res.data.entity);
                    
                        alert("You succesfully added a new account.\nPhp " + this.state.depositData.amount + " was deposited to account " + acctNum + ".");
                        this.handleCloseAddBankAccountModal()
                    
                });

            });
        console.log(this.state.user);
    }
    handleChangeUser = (e) => {
        this.setState({ 
            // enrollMerchantDetails: {
                [e.target.name]: e.target.value 
            // } 
          
        });
        console.log(e.target.name);
        console.log(e.target.value);
    }

    updateUserInfo = () => {
        let {address,birthdate,datecreated,firstname,gender,lastname,password,role,status,userid,username} = this.state.user;
        var endpoint = "/user/getUserByID/";
        var endpoint1= "/user/update/";
       

            Axios.put(baseAPIURL+endpoint1+this.state.user.userid,{address,birthdate,datecreated,firstname,gender,lastname,password,role,status,userid,username}  , config)
            
                .then(res => {
                    console.log("UPDATED");
                    console.log(res.data);
                    this.getUsers();
                    this.handleCloseEditUserModal();
                });
    
            
      
                
    }

    handleUsersChangeInfo = (e) => {
        const {name, value} = e.target;
        console.log(name);
        console.log(value);
        this.setState((prevState) => ({
            user: {
                ...prevState.user,
                [name]: value
            }
        }))
        console.log(this.state.user);
    }

    handleChangeDepositData = (e) => {
        var {name, value} = e.target;
        if(name === "amount") value = parseFloat(value);
        this.setState((prevState) => ({
            depositData: {
                ...prevState.depositData,
                [name]: value
            }
        }))
        console.log(this.state.depositData);
    }


    render() {
        let role = this.state.role;

        const data = {
            columns: [
              {
                label: '',
                field: 'edit',
                sort: 'asc',
                width: 150
              },
              {
                label: 'User ID',
                field: 'userid',
                sort: 'asc',
                width: 350
              },
              {
                label: 'Username',
                field: 'username',
                sort: 'asc',
                width: 270
              },
              {
                label: 'Name',
                field: 'name',
                sort: 'asc',
                width: 200
              },
              {
                label: 'Role',
                field: 'role',
                sort: 'asc',
                width: 100
              },
              {
                label: 'Status',
                field: 'status',
                sort: 'asc',
                width: 150
              },
              {
                label: 'Action',
                field: 'action',
                sort: 'asc',
                width: 150
              }
            ],
            
            rows: this.getFilteredUsers()
          }
        
        return (
            <div>
                <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"
                    integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf"
                    crossOrigin="anonymous" />

                <Fragment>
                    <div className="row container container-fluid">

                        <div className="col">
                            <Header />
                            <UserSideBar />
                        </div>

                        <div className="col-10 component-content list-of-users-div">
                            <h3>List of Users</h3>
                            <button className="btn btn-link" onClick={this.handleShowCreateUserModal} data-toggle="tooltip" data-placement="top" title="Create User"><i className="fas fa-user-plus"></i></button>  

                            {/* DATA TABLE */}
                            <MDBDataTable
                                className='list-of-users-datatable'
                                hover
                                sortable={true}
                                // autoWidth
                                data={data}
                                scrollY
                            />

                            {/* CREATE USER MODAL */}
                            <Modal show={this.state.showCreateUserModal} onHide={this.handleCloseCreateUserModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>Create User</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                

                                    <div>
                                        <label>First Name: <sup>*</sup></label>
                                        <input type="text" className="form-control" name="firstname"  onChange={this.handleUsersChangeInfo} required />
                                    </div>
                                        <br/>
                                    <div>
                                        <label>Last Name: <sup>*</sup></label>
                                        <input type="text" className="form-control" name="lastname"  onChange={this.handleUsersChangeInfo} required />
                                    </div>
                                        <br/>
                                    <div>
                                        <label>Birth Date: <sup>*</sup></label>
                                        <input type="date" className="form-control" name="birthdate"  onChange={this.handleUsersChangeInfo} required />
                                    </div>
                                        <br/>
                                    <div>
                                        <label>Address: <sup>*</sup></label>
                                        <input type="text" className="form-control" name="address"  onChange={this.handleUsersChangeInfo} required />
                                    </div>

                                {/* <div>
                                        <label className="status">Status:</label> <br />
                                            <input className="input_status" type="radio" name="status" value="0" onChange={this.handleUsersChangeInfo} required />Active <br />
                                            <input className="input_status" type="radio" name="status" value="1" onChange={this.handleUsersChangeInfo} required />Inactive <br />
                                </div> */}
                                        <br/>
                                    <div>
                                        <label className="gender">Gender:</label> <br />
                                            <input className="input_gender" type="radio" name="gender" value="0" onChange={this.handleUsersChangeInfo} required /> Male <br />
                                            <input className="input_gender" type="radio" name="gender" value="1" onChange={this.handleUsersChangeInfo} required /> Female<br />
                                    </div>
                                        <br/>
                                    <div>
                                        <label className="role">Role:</label> <br />
                                            <input className="input_role" type="radio" name="role" value="0" onChange={this.handleUsersChangeInfo} required /> Admin <br />
                                            <input className="input_role" type="radio" name="role" value="1" onChange={this.handleUsersChangeInfo} required /> User <br /><br />
                                    </div>
                                    <div>
                                        <label>User Name: <sup>*</sup></label>
                                        <input type="text" className="form-control" name="username" onChange={this.handleUsersChangeInfo} required />
                                    </div>
                                        <br/>
                                    <div>
                                        <label>Password: <sup>*</sup></label>
                                        <input type="password" className="form-control" name="password" onChange={this.handleUsersChangeInfo} required />
                                    </div>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="primary" className="btn btn-success btn-md" role="alert" onClick={this.posAddUser}>
                                        Register User
                                    </Button>
                                    <Button variant="secondary" onClick={this.handleCloseCreateUserModal}>
                                        Cancel
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* CREATE USER MODAL */}

                            {/* ADD BANK ACCOUNT MODAL */}
                            <Modal show={this.state.showAddBankAccountModal} onHide={this.handleCloseAddBankAccountModal}>
                                <Modal.Header closeButton>
                                    <Modal.Title>ADD BANK ACCOUNT</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                    <div>
                                        <label>Name: <sup>*</sup></label>
                                        <input type="text" className="form-control" placeholder="Enter account number" value={this.state.user.firstname + " " + this.state.user.lastname} onChange={(e) => {
                        let { user } = this.state;

                        user.firstname = e.target.value;
                        user.lastname = e.target.value;

                        this.setState({ user });
                      }} readOnly/>
                            <br />
                             <input type="hidden" className="form-control" name="creationdate"  value={this.state.creationdate} readonly/>
                                       
                            <input type="hidden" className="form-control" name="userid" value={this.state.user.userid} onChange={(e) => {
                                                    let { user } = this.state;

                                                    user.userid = e.target.value;
                                                    

                                                    this.setState({ user });
                                                }} readOnly/>
                                    </div>

                                    <div>
                                        <label>Initial Deposit: <sup>*</sup></label>
                                        <input type="text" onChange={this.handleChangeDepositData} className="form-control" name="amount" placeholder="Enter initial deposit" required />
                                    </div>
                                    
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="primary" onClick={this.posAddBank}>
                                        Save
                                    </Button>

                                    <Button variant="secondary" onClick={this.handleCloseAddBankAccountModal}>
                                        Cancel
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                            {/* ADD BANK ACCOUNT MODAL */}


                            {/* showEditUserModal */}
                            <Modal show={this.state.showEditUserModal} onHide={this.handleCloseEditUserModal}>
                                
                                <Modal.Header closeButton>
                                    <Modal.Title>Change Status</Modal.Title>
                                </Modal.Header>

                                <Modal.Body>
                                <input type="hidden" className="form-control" name="address" value={this.state.user.address} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.address = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>

                                <input type="hidden" className="form-control" name="datecreated" value={this.state.user.datecreated} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.address = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>

                                <input type="hidden" className="form-control" name="firstname" value={this.state.user.firstname} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.firstname = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>

                                <input type="hidden" className="form-control" name="gender" value={this.state.user.gender} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.gender = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>

                                <input type="hidden" className="form-control" name="lastname" value={this.state.user.lastname} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.lastname = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>

                                <input type="hidden" className="form-control" name="password" value={this.state.user.password} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.password = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>

                                <input type="hidden" className="form-control" name="role" value={this.state.user.role} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.role = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>

                                

                                <input type="hidden" className="form-control" name="userid" value={this.state.user.userid} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.userid = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>

                                <input type="hidden" className="form-control" name="role" value={this.state.user.role} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.role = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>

                                <input type="hidden" className="form-control" name="username" value={this.state.user.username} onChange={(e) => 
                                {
                                    let { user } = this.state;

                                    user.username = e.target.value;
                                    

                                    this.setState({ user });
                                }} readOnly/>
                                   
                                    <div>
                                        <label>Status: <sup>*</sup></label>
                                         <select class="form-control" name="status" onChange={(e) => 
                                {
                                    let { user } = this.state;
                                    user.status = e.target.value;
                                    this.setState({ user });
                                }} readOnly>
                                            <option value="0">Active</option>
                                            <option value="1">Inactive</option>
                                            
                                        </select>
                                    </div>
                                </Modal.Body>

                                <Modal.Footer>
                                    <Button variant="primary" className="btn btn-success btn-md" role="alert" onClick={this.updateUserInfo}>
                                        Edit User
                                    </Button>
                                </Modal.Footer>
                            </Modal>
                        </div>
                    </div>
                </Fragment>
            </div>
        )
    }
}