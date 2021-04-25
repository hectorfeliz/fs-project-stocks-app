const resultsReducer = (state = [], action) => {

    switch(action.type){
        case 'REPLACE':
            return action.payload
        case 'CLEAR':
            return []    
        default:
            return []     
    }

}

export default resultsReducer;