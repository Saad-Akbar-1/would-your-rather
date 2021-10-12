import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import Avatar from '@mui/material/Avatar';
import StyledBadge from '@material-ui/core/Badge'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'



const useStyles = makeStyles(theme => ({
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
class Nav extends Component {
    handleLogout = e => {
      e.preventDefault();
      
      this.props.setAuthedUser(null);
      
    }

    render () {
        const {authedUser , users} = this.props
        return (
            <AppBar position="static">
                <Toolbar>
                    <StyledBadge overlap="circular" anchorOrigin={{ vertical: 'top', horizontal: 'right' }} variant="dot">
                        <Avatar alt="Currently Logged In" src={authedUser.image.src} sx={{ width: 75, height: 75 }}/>
                    </StyledBadge>
                    
                    <Typography variant="h6" className='title'>Polls </Typography>
                    <Button color='inherit' component={Link} to="/" exact>
                        Home
                    </Button>
                    <Button color='inherit' component={Link} to="/new" >
                        New Poll
                    </Button>
                    <Button color='inherit' component={Link} to="/leaderboard">
                        Leader Board
                    </Button>
                    <Button color='inherit' onClick={(e) => this.handleLogout(e)}>
                        Logout
                    </Button>

                </Toolbar>
            </AppBar>
            
        )
    }
}

function mapStateToProps({ users, authedUser }) {
    return {
      authedUser,
      users
    };
  }


export default connect(mapStateToProps, {setAuthedUser})(Nav)