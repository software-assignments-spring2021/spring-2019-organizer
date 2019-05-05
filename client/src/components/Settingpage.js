import React, { Component } from 'react';
import Setting from './Setting';
import { Redirect } from 'react-router';
import SidebarLink from './Sidebar';
import Loader from 'react-loader-spinner'
import NavLink from 'react-bootstrap/NavLink';
import '../css/Setting.css';
// import user from '/server/src/app.js';



const UNAME = '123';
const PWD = '123';

class Settingpage extends Component {
  constructor(props){
    super(props);
    this.state=({
      NickName: "",
      netid:'123',
      password:'123',
      redirect: false,
      loginstate: false,
      loadingstate: false,
      loading: false
      


    })

  }
  // postData(`/user`, {netid, password})
  // .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
  // .catch(error => console.error(error));

  // function postData(url = ``, data = {}) {
  //   // Default options are marked with *
  //     return fetch(url, {
  //         method: "POST", // *GET, POST, PUT, DELETE, etc.
  //         mode: "cors", // no-cors, cors, *same-origin
  //         cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //         credentials: "same-origin", // include, *same-origin, omit
  //         headers: {
  //             "Content-Type": "application/json",
  //             // "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //         redirect: "follow", // manual, *follow, error
  //         referrer: "no-referrer", // no-referrer, *client
  //         body: JSON.stringify(data), // body data type must match "Content-Type" header
  //     })
  //     .then(response => response.json()); // parses JSON response into native Javascript objects 
  // }
    // componentDidMount(){
    //   fetch('/schedules')
    //     .then(res => {
    //       if (res.status === 200 & this.state.loginstate === true){

    //       }
    //       else if (res.status === 200 & this.state.loginstate === false){
    //         //redirect to Settingpage
    //       }
    //       else{
    //         const error = new Error(res.error);
    //         throw error;
    //       }
    //     })
    //     .catch(err => {
    //       console.error(err);
    //       this.setState({ loadingstate: false});
    //     });
    // }
    
    handleNickNameChange = (e) =>{
      this.setState({
        NickName:e.target.value
      })
    }
  

    handleUserNameChange = (e) =>{
      this.setState({
        userName:e.target.value
      })
    }

    handlePwdChange = (e) =>{
      this.setState({
        pwd:e.target.value
      })
    }

    handleNickNameChange = (e) =>{
      this.setState({
        NickName:e.target.value
      })
    }

    handleLogin = (e) =>{
      this.setState({loading: true});
        setTimeout(()=>{
          this.setState({loading : false});
        }, 2000)
      
      if(this.state.netid===UNAME&&this.state.password===PWD){
   
        // alert("Welcome to Organizer, you have been logged in successfully!"); 
        // this.setState({loginstate: true})
        // var userName = this.state.userName;
        // var pwd = this.state.pwd;

        this.setState({redirect: true})
        this.setState({loginstate: true})

        if (this.state.redirect & this.state.loginstate) {
          Redirect = this.fetchData
          
          
          return <Redirect to='/schedules'/>
          

        };
       
           
      }
      else if(this.state.netid!==UNAME){
        alert("Fail to log in: Username is wrong!");
      }
      else if(this.state.password!==PWD){
        alert("Fail to log in: Passwoed is wrong! ");
      }
      else{
        alert("Fail to login");
      }
    }
    
    //handle logout
    handleSign = () =>{
      if (this.state.loginstate === false){
        alert("You have not logged in")
      }
      else{
        alert("Logout successfully!");
     }
    }

    
  render() {
    if (this.state.loading === true){
      return ( 
        <Loader type="ThreeDots" color="#somecolor" display = 'flex' alignItems= 'center'
        justifyContent = 'center' height={200} width={800} />
        );
    }

    if (this.state.redirect) {

      return (
      <NavLink>
        <Redirect to="/schedules" />
        <SidebarLink to="/schedules" label="Schedules"/>
      </NavLink>
      )
      

    }
    
    // if (this.state.redirect) {
    //   return 

    //   return <SidebarLink to="/schedules" label="Schedules"/>

    // }

    else{
    
    return (
      <div className="Settingpage">   
        <Setting         
          handleUserNameChange={this.handleUserNameChange}
          handlePwdChange={this.handlePwdChange}
          handleSign={this.handleSign} //handle logout
          handleLogin={this.handleLogin}   
          handleNickNameChange={this.handleNickNameChange} 
          
        />
   
      </div>
    
    );
    
    }
    
  }
}

export default Settingpage;
