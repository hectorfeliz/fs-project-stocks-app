const Portfolio = require('./portfolioModel');

exports.createPortfolio = async ({ name, user }) => {
  try {
    const newPortfolio = new Portfolio({
      name, user
    });
    const portfolio = await newPortfolio.save();
    return portfolio;
  } catch (ex) {
    throw ex;
  }
};



exports.findPortfolioByID = async (id) => {
    try {
        const portfolio = await Portfolio.findById(id);
        return portfolio;
      } catch (ex) {
        throw ex;
      }
};


exports.addTransaction = async ({id, symbol, exchange, type, quantity, price}) => {
    try {
        const portfolio = await Portfolio.findById(id);

        portfolio.transactions.push({symbol, exchange, type, quantity, price});

        const updated = await portfolio.save();
        return updated;
        
      } catch (ex) {
        throw ex;
      }
};