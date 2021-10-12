import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddUserAnswer } from '../actions/users';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
import { Button }  from '@mui/material';



class Question extends Component {
  constructor(props){
    super(props)
    this.state = { 
      isAnswered : props.answered
    }

  }
  handleClick = (e,option) => {
    e.preventDefault()
    const { users,authedUser, question, handleAddUserAnswer } = this.props;

    handleAddUserAnswer(users[authedUser.key], question.id, option);
    
    this.setState({isAnswered:true})
  }

  render () {
      const {authedUser , answered , question , answerOption}  = this.props
      const totalVotes = question.optionOne.votes.length + question.optionTwo.votes.length
      const {isAnswered} = this.state
      return (
          <div>
              {isAnswered === true ? (
                <div>
                  <h2>Would you rather?</h2>
                  <Typography variant="h6" gutterBottom component="div">
                      1. {question.optionOne.text}? 
                      <Box sx={{ width: '100%',height: 200, bgcolor: 'inherit', }}>
                        <LinearProgress variant="determinate" value={(question.optionOne.votes.length/totalVotes) *100} />
                        <Typography variant="subtitle1" gutterBottom component="div">
                          {question.optionOne.votes.length} of {totalVotes} votes. {answerOption==='optionOne' && <CheckIcon/>}
                        </Typography>
                      </Box>
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                      2. {question.optionTwo.text}? 
                      <Box sx={{ width: '100%',height: 200, bgcolor: 'inherit', }}>
                        <LinearProgress variant="determinate" value={(question.optionTwo.votes.length/totalVotes) *100} />
                        <Typography variant="subtitle1" gutterBottom component="div">
                          {question.optionTwo.votes.length} of {totalVotes} votes. {answerOption==='optionTwo' && <CheckIcon/>}
                        </Typography>
                      </Box>
                  </Typography>
                  
                </div>
              ) : (
                <div>
                  <h2>Would you rather?</h2>
                  <Typography variant="h6" gutterBottom component="div">
                      1. {question.optionOne.text}? 
                      <Box sx={{ width: '100%',height: 200, bgcolor: 'inherit', }}>
                        
                        <Typography variant="subtitle1" gutterBottom component="div">
                          <Button onClick = {(e) => {this.handleClick(e,'optionOne')}} >
                            Vote
                          </Button>
                        </Typography>
                      </Box>
                  </Typography>
                  <Typography variant="h6" gutterBottom component="div">
                      2. {question.optionTwo.text}? 
                      <Box sx={{ width: '100%',height: 200, bgcolor: 'inherit', }}>
                        <Typography variant="subtitle1" gutterBottom component="div">
                          <Button onClick = {(e) => {this.handleClick(e,'optionTwo')}} > Vote </Button>
                        </Typography>
                      </Box>
                  </Typography>
                </div>
              )}
          </div>
      )
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
    const { id } = props.match.params
    const answered = (Object.keys(users[authedUser.key].answers)).includes(id)
    var answerOption
    answered === true ? (answerOption = users[authedUser.key].answers[id]) : answerOption = undefined
    const question = questions[id]
    return {
      authedUser,
      users,
      answered,
      question,
      answerOption,
    };
  }
  
  export default connect(
    mapStateToProps,
    { handleAddUserAnswer }
  )(Question);