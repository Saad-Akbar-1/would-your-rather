import React from 'react'
import { useEffect , useState} from 'react';
import { connect } from 'react-redux'
import Avatar from '@mui/material/Avatar';
import StyledBadge from '@material-ui/core/Badge'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import { Typography } from '@mui/material';



export const LeaderBoard = (props) => {
    
    return (
        <div>
            <h3>Leader Board</h3>
            <List sx={{ width: '100%', maxheight: 600, bgcolor: 'background.paper' }}>
                {props.sortedVotes.map((sortedUser) => (
                    <React.Fragment>
                        <ListItem key = {sortedUser} alignItems='flex-start'>
                            
                            <ListItemAvatar>
                                    <Avatar alt={sortedUser} src={props.users[sortedUser].avatarURL } />
                            </ListItemAvatar>
                            <ListItemText primary='Number of Votes '
                                          secondary={
                                          <React.Fragment>
                                            <Typography
                                                sx={{ display: 'inline' }}
                                                component="span"
                                                variant="body2"
                                                color="text.primary"
                                            >
                                                {Object.keys(props.users[sortedUser].answers).length}
                                            </Typography>
                                          </React.Fragment>
                                          }
                            />
                        </ListItem>
                        <Divider variant="inset" component="li" />
                    </React.Fragment>

                ))}
            </List>
        </div>
    )
}

function mapStateToProps({ users }) {
    console.log(users)
    const usersSortedByVotes = Object.keys(users).sort(function(a,b){return Object.keys(users[b].answers).length - Object.keys(users[a].answers).length })
    console.log(usersSortedByVotes)
    return {
      users: users,
      sortedVotes : usersSortedByVotes
    }
}


export default connect(mapStateToProps)(LeaderBoard)
