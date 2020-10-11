import React from 'react'
import MessageHeader from './message_header'
import MessageForm from './message_form'
import {Comment,Segment} from 'semantic-ui-react'
import firebase from '../../../firebase'

class Messages extends React.Component{
        state ={
            messagesRef : firebase.database().ref('messages'),
            channel:this.props.currentChannel,
            user:this.props.currentUser


        }
    render(){

        const {messagesRef,channel,user} =  this.state;

        return (
            <React.Fragment>
                <MessageHeader/>

                <Segment>
                    <Comment.Group className="messages">

                    </Comment.Group>
                </Segment>

                <MessageForm
                messagesRef={messagesRef}
                currentChannel={channel}
                currentUser={user}
                />
            </React.Fragment>

            )
    }
}

export default Messages