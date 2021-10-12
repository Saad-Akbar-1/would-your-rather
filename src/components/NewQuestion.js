import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { handleSaveQuestion } from '../actions/questions';


class NewQuestion extends Component {
    state = {
        questionValid: false,
        optionOne: '',
        optionTwo: '',
        isMounted: false
    }
    componentDidMount () {
        this.setState({
            isMounted: true
        })
    }
    componentWillUnmount () {
        this.setState({
            isMounted: false
        })
    }
    handleClick = (e) => {
        e.preventDefault()
        let mounted = true
        const { authedUser, handleSaveQuestion } = this.props;
        const { optionOne, optionTwo, isMounted } = this.state;


        if (isMounted) {
            new Promise((res, rej) => {
                handleSaveQuestion(optionOne, optionTwo, authedUser)
                setTimeout(() => res('success'), 1000)})
                    .then(() => {
                        this.setState({
                        option1: '',
                        option2: ''
                        })
                        this.setState({questionValid:true})
                    })
        }
        
    }
    render () {
        const disabled = this.state.option1 === '' || this.state.option2 === ''

        if (this.state.questionValid === true) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <h1>Would you rather?</h1>
                <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
                >
                    <TextField id="optionOne" label="Option 1" variant="filled" onChange = {(e) => this.setState({ [e.target.id]: e.target.value }) } />
                    <TextField id="optionTwo" label="Option 2" variant="filled" onChange = {(e) => this.setState({ [e.target.id]: e.target.value }) }/>
                </Box>
                <Button variant = 'outlined' onClick = {(e) => this.handleClick(e)} >
                    Add Question
                </Button>

            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
    return {
      authedUser
    }
  }
  
  export default connect(mapStateToProps, { handleSaveQuestion })(NewQuestion)