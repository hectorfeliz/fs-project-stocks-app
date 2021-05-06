const Portfolio = require("./portfolioModel");

//user = _id

exports.createPortfolio = async ({ user, portfolio }) => {
  try {
    const userId = user.sub;

    console.log("attemtping to create with", user, portfolio);

    const newPortfolio = new Portfolio({
      name: portfolio.name,
      transactions: portfolio.transactions,
      userId,
    });

    const portfolioSaved = await newPortfolio.save();
    return portfolioSaved;
  } catch (ex) {
    throw ex;
  }
};

exports.addTransaction = async ({ user, transaction }) => {
  try {
    const userId = user.sub;
    await Portfolio.updateOne(
      { userId },
      { $push: { transactions: transaction } }
    );
  } catch (ex) {
    throw ex;
  }
};


// id = _id

exports.findPortfolioByID = async (id) => {
  try {
    const portfolio = await Portfolio.findById(id);
    return portfolio;
  } catch (ex) {
    throw ex;
  }
};

exports.findPortfolioByUser = async (user) => {
  try {
    const userId = user.sub;
    const portfolio = await Portfolio.findOne({ userId });
    return portfolio;
  } catch (ex) {
    throw ex;
  }
};


