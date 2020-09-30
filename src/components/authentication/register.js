import md5 from "md5";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon,
} from "semantic-ui-react";
import firebase from '../../firebase'

export default class Register extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    errors:[],
    userRef:firebase.database().ref('users'),
    loading:false

  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = event =>{
      if(this.isFormValid()){
          this.setState({
              errors:[],
              loading:true
          })
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.password)
        .then(newUser =>{
            console.log(newUser);

            newUser.user.updateProfile({
                displayName:this.state.username,
                photoURL:`http://gravatar.com/avatar/${md5(newUser.user.email)}?d=identicon`
            }).then(()=>{
                this.saveUser(newUser).then(()=>{
                    console.log("user saved")
                })

            }).catch(error=>{
                console.log(error);
                this.setState({
                    errors:this.state.errors.concat(error),
                    loading:false
                })
    
            })
            
        })
        .catch(error=>{
            console.log(error);
            this.setState({
                errors:this.state.errors.concat(error),
                loading:false
            })

        })
      }
     

  }

  saveUser = (newUser)=> {
      return this.state.userRef.child(newUser.user.uid).set(
          {
              name:newUser.user.displayName,
              avatar:newUser.user.photoURL
          }
      )
  }

  isFormValid =() =>{
      let errors =[];
      let error;

      if(this.isFormEmpty(this.state) ){
        error = {message:"All fields are mandatory"};

        this.setState({errors:errors.concat(error)});
        return false;
      }
    else if(!this.isPasswordValid(this.state)){
        error = {message:"Password is invalid"};
        this.setState({errors:errors.concat(error)});
            return false;
    }
    else{
        return true;
    }
  }


isFormEmpty=({username,email ,password,confirmpassword })=>{
  return !username.length || !email.length || !password.length || !confirmpassword.length;
}

isPasswordValid=({password,confirmpassword})=>{
  

    if(password.length <6 || confirmpassword.length <6){
        return false;
    }
    else if(password !== confirmpassword){
        
        return false;
    }
    else{
        return true;
    }

}

 showErrors = errors => errors.map((error,i)=> <p key={i}>{error.message}</p>);
 
handleInputError =(errors,inputError) =>{
    return errors.some(error=>error.message.toLowerCase().includes(inputError))?'error':''

}
  render() {
      //destructure the state
     const {username,email,password,confirmpassword,errors,loading} = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h3" icon color="orange" textAlign="center">
            <Icon name="hand pointer" color="orange">
              Signup Here!
            </Icon>
          </Header>
          <Form size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                onChange={this.handleChange}
                value={username}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email"
                onChange={this.handleChange}
                value={email}
                type="email"
                className ={
                    this.handleInputError(errors,"email")
                }
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                className ={
                    this.handleInputError(errors,"password")
                }
                type="password"
              />
              <Form.Input
                fluid
                name="confirmpassword"
                icon="repeat"
                iconPosition="left"
                placeholder="Confirm Password"
                onChange={this.handleChange}
                value={confirmpassword}
                className ={
                    this.handleInputError(errors,"password")
                }
                type="password"
              />
              <Button disabled={loading} className={loading?'loading':''} color="orange" fluid size="large" onClick={this.onSubmit}>
                Submit
              </Button>
            </Segment>
          </Form>
          {errors.length>0 &&
          (
            <Message error>
                <h3>Error : </h3>
                {this.showErrors(errors)}
                </Message>

          )}
          <Message>
            Already a user ? <Link to="/login"> Login</Link>{" "}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
