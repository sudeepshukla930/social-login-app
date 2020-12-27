import React,{Component} from "react";
 import firebase from "firebase";
 import "./App.css";

 import StyleFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
 
 firebase.initializeApp({
  apiKey: "AIzaSyDqUYSIrkBybe-B8xNmWC21W2jxhn8wCpU",
  authDomain: "social-login-app-f88c0.firebaseapp.com"
})

class App extends Component{
  state= {isSignedIn: false}

  uiConfig={
    signInFlow: "popup",
    signInOptions:[
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks:{
      signInSuccess: ()=> false
    }
 
  }
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }
  render() {
    return (
      <div className="App">
        {this.state.isSignedIn ? (
          <span>
            <div>
            <h1>Welcome {firebase.auth().currentUser.displayName} </h1>
           
            <img
              className="Image"
              alt="profile"
              src={firebase.auth().currentUser.photoURL }
            />
            <h3>Email Id: {firebase.auth().currentUser.email} </h3>      
      
            </div>
            <br/><br/>

            <button id="Button" onClick={() => firebase.auth().signOut()}>Sign out!  </button>

            
          </span>
        ) : (
          <StyleFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        )}
      </div>
    )
  }

}


export default  App
