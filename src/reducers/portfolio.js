const portfolioReducer = (state = [], action) => {

    switch(action.type){
        case 'REPLACE_PORTFOLIO':
            return action.payload
        case 'CLEAR_PORTFOLIO':
            return []    
        default:
            return state     
    }

}

export default portfolioReducer;