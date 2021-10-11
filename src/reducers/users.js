import { RECEIVE_USERS, ADD_USER_ANSWER, ADD_USER_QUESTION } from "../actions/users";


export default function users (state = {} , action) {
    
    switch(action.type){
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case ADD_USER_ANSWER:
            const { authedUser, qid, answer } = action;
            return {
                ...state,
                [authedUser.id]: {
                    ...state[authedUser.id],
                    answers: {
                        ...state[authedUser.id].answers,
                        [qid]: answer
                    }
                }
            }
        case ADD_USER_QUESTION:
            const { id, author} = action
            
            return {
                ...state,
                [author.key] : {
                    ...state[author.key],
                    questions: state[author.key].questions.concat(id)
                }
            }
        default :
            return state
    }
}