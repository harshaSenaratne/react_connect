import React from 'react'
import MessageHeader from './message_header'
import MessageForm from './message_form'
import Message from './message'
import {Comment,Segment} from 'semantic-ui-react'
import firebase from '../../../firebase'

class Messages extends React.Component{
        state ={
            messagesRef : firebase.database().ref('messages'),
            channel:this.props.currentChannel,
            user:this.props.currentUser,
            messages:[],
            messagesLoading:true


        }

    componentDidMount(){
        const {channel,user} = this.state;

        if(channel && user)
        {
           this.addListners(channel.id)     
        }
    }

    addListners = (channelId) =>{
        this.addMessageListner(channelId)
    }

    addMessageListner =(channelId)=>{
        const {messagesRef} = this.state;
        let loadMessages =[];
        messagesRef.child(channelId).on('child_added',snap=>{
            loadMessages.push(snap.val());
            this.setState({
                messages:loadMessages,
                messagesLoading:false
            });

        });         
    }

        showMessages = (messages) =>(
            messages.length >0 && messages.map(
                msg=>(
                  <Message
                    key={msg.timestamp}
                    message={msg}
                    user={this.state.user}    
                  />      
                )
            )
        )

    render(){

        const {messagesRef,channel,user,messages} =  this.state;

        return (
            <React.Fragment>
                <MessageHeader/>

                <Segment>
                    <Comment.Group className="messages">
                    {this.showMessages(messages)}
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