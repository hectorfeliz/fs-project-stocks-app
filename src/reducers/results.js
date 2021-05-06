const resultsReducer = (state = [], action) => {

    switch(action.type){
        case 'REPLACE_RESULTS': {
            return{
                ...state,
                results: action.payload
            } 
         }
        case 'CLEAR_RESULTS':
            return []    
        default:
            return state     
    }

}

export default resultsReducer;