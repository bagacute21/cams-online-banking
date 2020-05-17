import React, { Component, Fragment } from "react";
import { MDBNotification, MDBAlert  } from "mdbreact";

import '../css/Notifications.css';

class Notification extends Component {

    constructor(props) {
        super(props);

        this.state = {
            notif: false
        }
    }

    toggleNotif = () => {

        this.setState({
          notif: true
        });
      }

    notifOnClick = () =>
    {
        console.log("HELLO");
        // alert("work");
        
        if (this.state.notif)
        {
            return(

                <MDBNotification
                    show
                    fade
                    iconClassName="text-primary"
                    title="Bootstrap"
                    message="Hello, world! This is a toast message."
                    text="11 mins ago"
                    style={{
                        position: "fixed",
                        top: "10px",
                        right: "10px",
                        zIndex: 9999}}
                />
            );
        }
    }

    changeNotifState()
    {
        this.setState({
            notif: false
        });
    }

    alertOnClick = () =>
    {
        return (
            <MDBAlert color="warning" dismiss onClose={
                this.changeNotifState()
            }>
                <strong>Holy guacamole!</strong> You should check in on some of those fields below.
            </MDBAlert>
        );
    }

  render() {
    console.log(this.state.notif);
    return (
      <Fragment>
            <button onClick={this.toggleNotif}>click me</button>

            {this.state.notif && 
                <MDBAlert className='alert-success' color="success" dismiss>
                    A simple success alert—check it out!
                </MDBAlert>
            }

            {/* <MDBNotification 
                show = {this.state.notif}
                fade
                iconClassName="text-primary"
                title="Bootstrap"
                message="Hello, world! This is a toast message."
                text="11 mins ago"
                style={{
                    position: "fixed",
                    top: "10px",
                    right: "10px",
                    zIndex: 9999}}
            /> */}

      </Fragment>
    );
  }
}

export default Notification;