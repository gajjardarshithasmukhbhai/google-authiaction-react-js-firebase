import React, { Component } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
var firebase=require("firebase");
var config = {
    apiKey: "AIzaSyAi2J7E2P1j1MMBiOTsN3jNAFq_4wlqBgw",
    authDomain: "login-firebase-e0dec.firebaseapp.com",
    databaseURL: "https://login-firebase-e0dec.firebaseio.com",
    projectId: "login-firebase-e0dec",
    storageBucket: "login-firebase-e0dec.appspot.com",
    messagingSenderId: "227632912077"
  };
  firebase.initializeApp(config);
class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      err:"" 
    };
    this.click=this.click.bind(this);
    this.signUp=this.signUp.bind(this);
  }
  click(even)
  {
    const email=this.refs.email.value;
    const password=this.refs.password.value;
    console.log(email,password);
    const auth=firebase.auth();
    const promise=auth.signInWithEmailAndPassword(email,password);
    
    // TODO:handle the login
    
    promise.catch(e=>{
      var err=e.message;
      this.setState({
        err:err,
      })
    });
  }
  signUp()
  {
    const email=this.refs.email.value;
    const password=this.refs.password.value;
    console.log(email,password);
    const auth=firebase.auth();
    const promise=auth.createUserWithEmailAndPassword(email,password);
    promise.then(user=>{
      var err="welcome"+email;
      console.log(err);
      
      firebase.database().ref('user/').set({
        email:email,
        password:password,
      });
      console.log(user);
      this.setState({
        err:err,
      });
    });
    promise
    .catch(err=>{
      var error=err.message;
      console.log(error);
      console.log("darshit gajjar");
      this.setState(({
        err:error,
      }))
    })
  }
  
  render() {
    return (
      <div>
          <h1 class="text text-danger text-center text-capitalize">i am firebase auntahtication</h1>
          <input type="email" id="name" ref="email" className="switch "/>
          <br/>
          <br/>
          <input type="password" id="password" ref="password" className="switc"/>
          <button type="button" onClick={this.click} className="btn  mnb">click</button>
          <p class="text text-danger text-left">{this.state.err}</p>
          <button type="button"  className="btn btn-danger mbn" onClick={this.signUp}>signup</button>
      </div>
    );
  }
}

export default App;
