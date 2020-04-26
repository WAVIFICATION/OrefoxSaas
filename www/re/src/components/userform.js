import React, { Component } from 'react'
import formuserdetails from './formuserdetails'

export class userform extends Component {
    state = {
        step:1,
        first_Name: '',
        last_name: '',
        email: '',
        
    }

// Proceed to next step
    nextStep = () => {
        const {step} = this.state;
        this.setState({
            step: step + 1
        });
    }

    prevStep = () => {
        const {step} = this.state;
        this.setState({
            step: step - 1
        });
    }

// Handle field change
    handleChange = input => e => {
        this.setState({[input]:e.target.value})
    }

    render() {
        const {step} = this.state;
        const {first_Name,last_name,email} = this.state;
        const values = {first_Name,last_name,email}
        
        switch(step) {
            case 1:
                return(
                    <formuserdetails
                      nextStep = {this.state}
                      handleChange = {this.handleChange}
                      values = {values}
                    />
                    )
            case 2:
                return <h1>confirm</h1>
            case 3:
                return <h1>success</h1>
            default:
                return <h1>Invalid</h1>
        }
    }
}

export default userform
