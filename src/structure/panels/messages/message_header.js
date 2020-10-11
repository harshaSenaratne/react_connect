import React from 'react'
import {Header,Segment,Icon,Input} from 'semantic-ui-react'

class MessageHeader extends React.Component{
    render(){
        return (
                <Segment clearing>  
                <Header fluid="true" as="h2" floated="left" style={{marginBottom:0}}>
                    <span>
                    Channel

                    <Icon name={"star outline"} color="black"/> 
                    </span>

                    <Header.Subheader>
                        2 Users
                    </Header.Subheader>
                </Header>
                <Header floated="right" >
                <Input size="mini" icon="search" name="searchItem" placeholder="Search Your Messages">
                
                </Input>
                </Header>

                </Segment>

            )
    }
}

export default MessageHeader