const portfolioReducer = (state = [], action) => {

    switch(action.type){
        case 'REPLACE_PORTFOLIO': {
           
             return Object.assign(
                {},
                {
                  ...state,
                  portfolio: {
                    transactions: [].concat(action.payload.transactions)
                  }
                  
                },
              );
            }
        case 'CLEAR_PORTFOLIO':
            return []    
        default:
            return state     
    }

}

export default portfolioReducer;