import React from 'react';
import firebase from '../../../firebase'
import {Icon, Menu,Modal,Form,Input,Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {setCurrentChannel} from '../../../actions'

class Channels extends React.Component{
    state={
        channels:[],
        modal:false,
        channelName:"",
        channelInfo:"",
        user:this.props.currentUser,
        channelReference:firebase.database().ref("channels")

    }

    componentDidMount(){
        this.channelUpdateListner()
    }

    channelUpdateListner=()=>{
        let loadChannel=[];
        this.state.channelReference.on('child_added',snap=>{
            loadChannel.push(snap.val());
            this.setState({channels:loadChannel})
            console.log(loadChannel);
        })
    }
    closeModal =()=> this.setState({modal:false});
    openModal =()=> this.setState({modal:true});

    addChannel = ()=>{
           const {channelReference,channelName,channelInfo,user} = this.state;
           const key = channelReference.push().key;
           
           const newChannel={
               id:key,
               name:channelName,
               information:channelInfo,
               createdBy:{
                name:user.displayName,
                avatar:user.photoURL
               }
           };

           channelReference.child(key).update(newChannel).then(()=>{
            this.setState({channelName:"",channelInfo:""});
            this.closeModal();
           }).catch(error=>{
               console.log(error);
           });


    }

    handleChange =(event)=>{
        this.setState({[event.target.name]:event.target.value});
    }

    formValidate =({channelName,channelInfo}) => channelInfo && channelName;

    handleSubmit = (event) =>{

        event.preventDefault();
        if(this.formValidate(this.state)){
            this.addChannel()
        }
    }

    showChannels = channels =>(
        channels.length >0 && channels.map(ch=>(
            <Menu.Item
                key={ch.id}
                onClick={()=> this.changeChannel(ch)}
                name={ch.name}
                style={{opacity:0.7}}>
         
                *{ch.name}

                </Menu.Item>               
        ))
    )

    changeChannel = (channel) =>{

    }

    render(){
        const {channels,modal} = this.state;

        return(
         <React.Fragment>
   <Menu.Menu style={{paddingBottom:'2em'}}>
            <Menu.Item>
                <span>
                    <Icon name="exchange"/>
                    Channels {""}
                </span> ({channels.length}) <Icon name="add" onClick={this.openModal}/>
                </Menu.Item>
                {this.showChannels(channels)}
        </Menu.Menu>
        <Modal basic open={modal}  onClose={this.closeModal} >
            <Modal.Header>
                Add Channel
            </Modal.Header>
            <Modal.Content>
            <Form>
                <Form.Field>
                    <Input fluid label="Name of channel" name="channelName" onChange={this.handleChange}>
                    </Input>
                </Form.Field>

                <Form.Field>
                    <Input fluid label="Channel Information" name="channelInfo" onChange={this.handleChange}>
                    </Input>
                </Form.Field>
            </Form>

            </Modal.Content>
<Modal.Actions>
    <Button color="#4c3c4c" inverted onClick={this.handleSubmit}>
        <Icon name="checkmark"/> Add
 
    </Button>
    <Button color="red" inverted onClick={this.closeModal}>
        <Icon name="remove"/> Cancel
 
    </Button>
    </Modal.Actions>            
        </Modal>       
         </React.Fragment>
      
        );
    }
}

export default connect(null,{setCurrentChannel})(Channels);