
import { addQuestionAnswer } from "../actions/questions"
import { saveQuestionAnswer } from "../utils/api"

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER'
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION'

export function addUserQuestion ( {id, author}){
    return {
        type : ADD_USER_QUESTION,
        id,
        author
    }
}


function addUserAnswer(authedUser, qid, answer){
    return {
        type: ADD_USER_ANSWER,
        authedUser,
        qid,
        answer,
    }
}

export function receiveUsers(users){
    return {
        type: RECEIVE_USERS,
        users,
    }
}

export function handleAddUserAnswer( authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(addUserAnswer(authedUser, qid, answer))
        dispatch(addQuestionAnswer(authedUser, qid, answer))

        return saveQuestionAnswer(authedUser, qid, answer).catch(e => {
            console.error('Error. Try Answering the Question again!')
        })
    }
}