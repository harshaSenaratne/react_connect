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

export default class Login extends Component {
  state = {
    email: "",
    password: "",
    errors:[],
    loading:false

  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  onSubmit = event =>{
      event.preventDefault();
      if(this.isFormValid(this.state)){
          this.setState({
              errors:[],
              loading:true
          });
        firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.password)
        .then((signedInUser)=>{
            console.log(signedInUser);

        }).catch((error)=>{
            console.log(error);
            this.setState({
                errors:this.state.errors.concat(error),
                loading:false
            })
        })
      }
     

  }

  isFormValid=({email,password})=> email && password;

 showErrors = errors => errors.map((error,i)=> <p key={i}>{error.message}</p>);
 
handleInputError =(errors,inputError) =>{
    return errors.some(error=>error.message.toLowerCase().includes(inputError))?'error':''

}
  render() {
      //destructure the state
     const {email,password,errors,loading} = this.state

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h3" icon color="orange" textAlign="center">
            <Icon name="hand pointer" color="violet">
              Login Here!
            </Icon>
          </Header>
          <Form size="large">
            <Segment stacked>
              
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
              
              <Button disabled={loading} className={loading?'loading':''} color="violet" fluid size="large" onClick={this.onSubmit}>
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
            Dont' have an account ? <Link to="/register">Register</Link>{" "}
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}
