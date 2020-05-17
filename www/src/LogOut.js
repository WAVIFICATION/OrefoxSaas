import React, { Component } from "react";
import {Redirect } from "react-router-dom";
import {Button} from "semantic-ui-react";


class Logout extends Component {
    state = {
        navigate: false,
        loading: false
    };
   logout = () => {
    const url='/api/SignOut'
    fetch(url, { 
        method: "GET"})
       localStorage.clear("token");
       this.setState({navigate:true});
       fetch("/api/SignOut")
       .then(Response=>Response.json())
       .then(Response=>console.log(Response))
       .then(this.setState({loading:true}))
   };

   render(){
       const {loading} = this.state;
    
        if(loading)
        {
            return <Redirect to="/signin" push={true}/>
        }
        return(
            <Button onClick={this.logout}> Log out </Button>
        ) 

    
   }
   } 


export default Logout;