import React from 'react'
import { Component , Fragment } from 'react';
import { connect } from 'react-redux';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { setAuthedUser } from '../actions/authedUser';

import IconButton from '@mui/material/IconButton';
import FolderIcon from '@material-ui/icons/Folder';





class Login extends Component {
    getUsers = () => {
        const { users } = this.props;

        return users.map(user => ({
            key: user.id,
            text: user.name,
            value: user.id,
            answers : user.answers,
            image: { avatar: true, src: user.avatarURL },
            questions : user.questions,
            avatarURL: user.avatarURL,
        }));
    };
    handleClick = (user) => {
        const { setAuthedUser } = this.props;

        setAuthedUser(user)
    }
  
    render() {
      return (
        <Fragment>
            <List sx={{ width: '100%', height: 1000, bgcolor: 'background.paper' }}>
                {this.getUsers().map((user) => (
                    <React.Fragment>
                        <ListItem key = {user.key} alignItems='flex-start'  
                            secondaryAction= {
                            <IconButton edge="end" aria-label="Sign In">
                                <FolderIcon onClick = {() => this.handleClick(user)}/>
                            </IconButton>
                        }>
                        <ListItemAvatar>
                            <Avatar alt={user.text} src={user.image.src} />
                        </ListItemAvatar>
                        <ListItemText primary={user.text} />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                     </React.Fragment>
                    ))}
            </List>
        </Fragment>
      )
    }
}

function mapStateToProps({ users }) {
    return {
      users: Object.values(users)
    };
}

export default connect(mapStateToProps,{setAuthedUser})(Login)