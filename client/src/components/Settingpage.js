import React, { Component } from 'react';
import Setting from './Setting';
import { Redirect } from 'react-router';
import SidebarLink from './Sidebar';
import Loader from 'react-loader-spinner'
import NavLink from 'react-bootstrap/NavLink';
import '../css/Setting.css';


// const UNAME = '123';
// const PWD = '123';

class Settingpage extends Component {
  constructor(props){
    super(props);
    this.state=({
      // nickName: "",
      // netid:'123',
      // password:'123',
      redirect: false, //redirect to schedule page
      loginstate: false, 
      loadingstate: false, //state of spinner
      loading: false //spinner loader
      


    })

  }
  
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
      this.setState({redirect: true})
      this.setState({loginstate: true})
      this.setState({loading: true});
        setTimeout(()=>{
          this.setState({loading : false});
        }, 700)
        this.setState({loginstate: true})
        this.state.user = { 
          name: "", 
          netid: "", 
          password: "" 
        };
        this.setState({user: {name: this.state.nickname, netid: this.state.nickname, password: this.state.nickname}});
        // var this.state.user.name = this.state.nickname;
        // var this.state.user.netid = this.state.netid;
        // var this.state.user.password = this.state.password;

        fetch('/user',{
          method: "POST",
          body: JSON.stringify(this.user),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).catch(err => {
          console.log(err);
        });
      
        
        // Redirect = this.fetchData

        //if user and password matches
        return <Redirect to='/schedules'/>
        

        // else stay on the same page
      }
      
      
   
        // alert("Welcome to Organizer, you have been logged in successfully!"); 
        
    //     if(this.state.netid===UNAME&&this.state.password===PWD){

    //     this.setState({redirect: true})
    //     this.setState({loginstate: true})

    //     if (this.state.redirect & this.state.loginstate) {
    //       Redirect = this.fetchData
          
          
    //       return <Redirect to='/schedules'/>
          

    //     };
       
           
    //   }
    //   else if(this.state.netid!==UNAME){
    //     alert("Fail to log in: Username is wrong!");
    //   }
    //   else if(this.state.password!==PWD){
    //     alert("Fail to log in: Passwoed is wrong! ");
    //   }
    //   else{
    //     alert("Fail to login");
    //   }
    // }
    
    
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
