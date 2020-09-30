import { combineReducers } from 'redux';
import * as actionTypes from '../actions/types';

const initialUserState={
    isLoading:true,
    currentUser:null
};

const initialChannelState={
    currentChannel:null
}

//user related reducers
const user_reducer =(state = initialUserState,action) =>{
    switch(action.type){
        case actionTypes.SET_USER:
            return{
                currentUser:action.payload.currentUser,
                isLoading:false
            }
        
        case actionTypes.CLEAR_USER_DETAILS:
            return{
                ...initialUserState,
                isLoading:false

            }    

            default:
                return state;
            
    }
}


//channel related reducers
const channel_reducer =(state=initialChannelState,action) =>{
    switch(action.type){
        case actionTypes.SET_CURRENT_CHANNEL:
            return{
                ...state,
                currentChannel:action.payload.currentChannel
            }
            
            default:
                return state;
    }
}




const rootReducer  = combineReducers({
    user:user_reducer,
    channel:channel_reducer
})

export default rootReducer;