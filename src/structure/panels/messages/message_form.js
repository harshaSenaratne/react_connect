import React from 'react'
import {Segment,Button,Input} from 'semantic-ui-react'
import firebase from '../../../firebase'
import FileModal from './file_modal'

class MessageForm extends React.Component{
    state={
        message:'',
        channel:this.props.currentChannel,
        user:this.props.currentUser,
        loading:false,
        errors:[],
        modal:false

    }


handleChange = event=>{
    this.setState({[event.target.name]:event.target.value});
}

openModal =()=>{
    this.setState({
        modal:true
    })
}

closeModal =()=>{
    this.setState({
        modal:false
    })
}

createMessage =()=>{
    const {user} = this.state;
    console.log(this.state.message);
    const message={
        content:this.state.message,
        timestamp:firebase.database.ServerValue.TIMESTAMP,
        user:{
            id:user.uid,
            name:user.displayName,
            avatar:user.photoURL

        }
    };
    return message;
}

uploadFile = (file,meta_data) =>{
    console.log(file,meta_data);
}

sendMessage = ()=>{

    const {message,channel} = this.state;
    const {messagesRef} = this.props;

    if(message){
        this.setState({loading:true});
        messagesRef.child(channel.id).push().set(this.createMessage())
        .then(()=>{
            this.setState({loading:false,message:'',errors:[]})
        })
        .catch(err=>{
            console.error(err);
            this.setState({
                loading:false,
                errors:this.state.errors.concat(err)
            })
        })
    }

    else{
        this.setState({
            loading:false,
            errors:this.state.errors.concat({message:"Add a message"})
        }) 
    }
}
    render(){
        const {errors,message,loading,modal} = this.state;
        return (
                <Segment className="message_form">
                    <Input
                    fluid
                    name="message"
                    onChange={this.handleChange}
                    value={message}
                    className={
                        errors.some(err => err.message.includes('message'))?'error' :''
                    }
                    style={{marginBottom:'0.8em'}}
                    label={<Button icon={'add'}/>}
                    labelPosition="left"
                    placeholder="Enter your message here"
                    >

                    </Input>  

                    <Button.Group 
                    icon widths="2">
                            <Button color="orange"
                            content="Add Reply"
                            labelPosition="left"
                            icon="edit"
                            disabled={loading}
                            onClick={this.sendMessage}
                            
                            />

                    <Button color="teal"
                        onClick={this.openModal}
                            content="Upload Media"
                            labelPosition="right"
                            icon="cloud upload"
                            
                            />

                    <FileModal
                    modal={modal}
                    uploadFile={this.uploadFile}
                    closeModal={this.closeModal}
                    />

                    
          

                    
                    </Button.Group>
               
                </Segment>

            )
    }
}

export default MessageForm