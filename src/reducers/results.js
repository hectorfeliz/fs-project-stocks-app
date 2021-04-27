const resultsReducer = (state = [], action) => {

    switch(action.type){
        case 'REPLACE_RESULTS':
            return action.payload
        case 'CLEAR_RESULTS':
            return []    
        default:
            return state     
    }

}

export default resultsReducer;