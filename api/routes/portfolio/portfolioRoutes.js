const requiresAuth = require("../../middleware/requiresAuth");
const express = require("express");
const {
  createPortfolio,
  findPortfolioByID,
  addTransaction,
  findPortfolioByUser,
} = require("./portfolioController");

const router = express.Router();

router.use(requiresAuth);

// CREATE NEW PORTFOLIO
router.route("/").post(async (req, res) => {

  const portfolio = req.body;
  const user = req.user;
  console.log('portfolio route', portfolio);

  try {
    const portfolioSend = await createPortfolio({ user, portfolio });
    console.log('sent to controller');
    res.status(201).json(portfolioSend);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }

});


// add transactions
router.route("/transaction").post(async (req, res) => {

  const transaction = req.body;
  const user = req.user;

  try {
    
    const portfolioSend = await addTransaction({ user, transaction });
    console.log('transaction sent to controller');
    res.status(201).json(portfolioSend);

  } catch (err) {

    console.log(err);
    res.status(500).json({ message: "internal server error" });

  }
});



// GET PORTFOLIO BY USERID
router.route("/").get(async (req, res) => {
  const user = req.user;
  
  try {
    const portfolioByUser = await findPortfolioByUser(user);
    res.json(portfolioByUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }

});




module.exports = router;
