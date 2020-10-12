import React from 'react'
import mime from 'mime-types'
import {Modal, Input,Icon,Button} from 'semantic-ui-react'


class FileModal extends React.Component{
     state={
         file : null,
         verified:["image/jpeg", "image/png"]
     }

     addFile =event=>{
         const file = event.target.files[0];
         console.log(file);
         if(file){
             this.setState({
                 file
             });

         }

     }

sendFile =()=>{
    const {file} = this.state;
    const {closeModal,uploadFile} = this.props;


    if(file !==null)
    {
        if(this.verifyType(file.name)){
            const meta_data ={
                contentType:mime.lookup(file.name)
               
            }
            uploadFile(file,meta_data);
            closeModal();
            this.clearFile();
        }

    }
}


clearFile =(filename)=> this.setState({file:null}); 




verifyType = filename =>this.state.verified.includes(mime.lookup(filename));

    render(){
        const {modal,closeModal} = this.props;
        return(
            <Modal basic open={modal} onClose={closeModal}>
                <Modal.Header>Select Image File</Modal.Header>
                <Modal.Content>
                    <Input
                    onClick={this.addFile}
                    fluid
                    label="File types : jpg, png"
                    name="file"
                    type="file"
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                    color="green"
                    inverted
                    >
                    <Icon name="checkmark"/> 
                    Send
                    </Button>

                    <Button
                    color="red"
                    onClick={closeModal}
                    inverted
                    >
                    <Icon name="remove"/> 
                    Cancel
                    </Button>

            
                </Modal.Actions>

            </Modal>
        )
    }
}

export default FileModal;