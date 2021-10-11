import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import StyledBadge from '@material-ui/core/Badge'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';

import IconButton from '@mui/material/IconButton';
import FolderIcon from '@material-ui/icons/Folder';
import { Typography } from '@mui/material';
import { Link, withRouter } from 'react-router-dom'


class Dashboard extends Component {
    render () {
        const { userQuestions } = this.props;
        const { users } = this.props

        return (
            <div>
                <h3>My Answered Polls</h3>
                <List sx={{ width: '100%', maxheight: 600, bgcolor: 'background.paper' }}>
                    {userQuestions.answered.map((question) => (
                        <React.Fragment>
                            <ListItem key = {question.id} alignItems='flex-start'  
                                secondaryAction= {
                                <IconButton edge="end" aria-label="Sign In">
                                    <Link to={`/question/${question.id}`}>
                                        <FolderIcon />
                                    </Link>
                                </IconButton>
                            }>
                            
                            <ListItemAvatar>
                                <Avatar alt={question.author} src={typeof(question.author) === 'object' ? question.author.avatarURL : users[question.author].avatarURL } />
                            </ListItemAvatar>
                            <ListItemText primary="Would you rather" secondary={<React.Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {question.optionOne.text}
                                                                    </Typography>
                                                                    <Typography> or</Typography>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {question.optionTwo.text} 
                                                                    </Typography>
                                                                    </React.Fragment> }/>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                        ))}
                </List>
                <h3>My Unanswered Polls</h3>
                <List sx={{ width: '100%', maxheight: 1000, bgcolor: 'background.paper' }}>
                    {userQuestions.unanswered.map((question) => (
                        <React.Fragment>
                            <ListItem key = {question.id} alignItems='flex-start'  
                                secondaryAction= {
                                <IconButton edge="end" aria-label="Sign In">
                                    <Link to={`/question/${question.id}`}>
                                        <FolderIcon />
                                    </Link>
                                </IconButton>
                            }>
                            <ListItemAvatar>
                                <Avatar alt={question.author} src={typeof(question.author) === 'object' ? question.author.avatarURL : users[question.author].avatarURL } />
                            </ListItemAvatar>
                            <ListItemText primary="Would you rather" secondary={<React.Fragment>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {question.optionOne.text}
                                                                    </Typography>
                                                                    <Typography> or</Typography>
                                                                    <Typography
                                                                        sx={{ display: 'inline' }}
                                                                        component="span"
                                                                        variant="body2"
                                                                        color="text.primary"
                                                                    >
                                                                        {question.optionTwo.text} 
                                                                    </Typography>
                                                                    </React.Fragment> }/>
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                        ))}
                </List>
            </div>
        )
    }
}


function mapStateToProps({ authedUser, users, questions }) {
    const answeredIds = Object.keys(users[authedUser.key].answers);
    const answered = Object.values(questions)
      .filter(question => answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
    const unanswered = Object.values(questions)
      .filter(question => !answeredIds.includes(question.id))
      .sort((a, b) => b.timestamp - a.timestamp);
  
    return {
      userQuestions: {
        answered,
        unanswered
      },
      users
    };
  }
  export default withRouter(connect(mapStateToProps)(Dashboard))

