import React from 'react'
import {Menu} from 'semantic-ui-react'
import UserPanel from './user_panel'
import Channels from './channels'

class SidePanel extends React.Component{
    render(){
        const {currentUser} = this.props;
        return (
            <Menu size="large"
            inverted
            fixed="left"
            vertical
            style={{background:"#4c3c4c", fontsize:"1.2rem"}}
            > 
        <UserPanel currentUser={currentUser} />
        <Channels currentUser={currentUser}/>
            </Menu>
        )
    }
}

export default SidePanel