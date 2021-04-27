const replaceResults = repl => {

    return {
        type: 'REPLACE_RESULTS',
        payload: repl
    };

};

const replacePortfolio = repl => {

    return {
        type: 'REPLACE_PORTFOLIO',
        payload: repl
    };

};



module.exports = {
    replaceResults,
    replacePortfolio
};