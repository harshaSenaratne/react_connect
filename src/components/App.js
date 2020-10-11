import React from 'react';
import {Grid} from 'semantic-ui-react';
import ColorPanel from '../structure/panels/color_panel/color_panel'
import SidePanel from '../structure/panels/side_panel/side_panel'
import Messages from '../structure/panels/messages/messages'
import MetaPanel from '../structure/panels/meta_panel/meta_panel'
import {connect} from 'react-redux';

import './App.css';

const App = ({currentUser,currentChannel})=> (
<Grid columns="equal" className="app" style={{background:"#eee"}}>
  <ColorPanel/>
  <SidePanel 
  key={currentChannel && currentChannel.id}

  currentUser={currentUser}
  
  />
<Grid.Column style={{marginLeft:320}}>

<Messages 

key={currentChannel && currentChannel.id}
currentChannel={currentChannel}
currentUser={currentUser}

/>
</Grid.Column>

<Grid.Column width={4}>
<MetaPanel/>

</Grid.Column>

</Grid>
)

const mapStateToProps = state =>({
currentUser:state.user.currentUser,
currentChannel:state.channel.currentChannel
});

export default connect(mapStateToProps)(App);
