import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import Login from './components/authentication/login'
import Register from './components/authentication/register'
import {BrowserRouter as Router,Switch,Route,withRouter} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css'
import firebase from './firebase'
import {createStore} from 'redux'
import {Provider,connect} from 'react-redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import {setUser,clearUserDetails} from './actions'
import rootReducer from './reducers'
import Spinner from './ui_components/spinner'
const store = createStore(rootReducer,composeWithDevTools());



class Root extends React.Component{
  componentDidMount(){
    console.log("component did mount called")
    firebase.auth().onAuthStateChanged(user =>{
      if(user){
        console.log(user);
        this.props.setUser(user);
        this.props.history.push('/');
      }
      else{
        this.props.history.push("/login");
        this.props.clearUserDetails();

      }
    });
  }
  render(){
    return this.props.isLoading? <Spinner/> :(
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
      </Switch>
        
      );
  }

}

const mapStateFromProps = state =>({
  isLoading:state.user.isLoading
  });


const AuthRoot = withRouter(connect(mapStateFromProps,{setUser,clearUserDetails})(Root)) ;

 


ReactDOM.render(
  <Provider store={store}>
  <Router>
    <AuthRoot/>
  </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
