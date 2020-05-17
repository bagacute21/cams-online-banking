import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
    super(props);
    this.state = {hasError: false };
}

componentDidCatch(error, info) {
    this.setState({hasError: true });
}

render() {
    if (this.state.hasError) {
        return alert("Incorrect credentials.");
    } else {
        return this.props.children;
        }
    }
} 
