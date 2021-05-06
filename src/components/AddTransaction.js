import React from "react";
import { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import AddBoxIcon from "@material-ui/icons/AddBox";
import QueueIcon from "@material-ui/icons/Queue";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import "../css/AddTransaction.css";
import { useAuth0 } from '@auth0/auth0-react';

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { replacePortfolio } from "../actions";

import HoldingsStock from "./HoldingsStock";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

export default function AddTransaction({
  symbol,
  exchange,
  stockPrice,
  currency,
  close
}) {

  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(parseFloat(stockPrice));
  const dispatch = useDispatch();
  const portfolio = useSelector((state) => state.portfolio).portfolio;

  const {
    getAccessTokenSilently,
    isLoading,
    isAuthenticated,
  } = useAuth0();


  const createPortfolio = async (portfolio) => {

    const token = await getAccessTokenSilently();


     // attempting to save portfolio
      const response = await fetch('/api/portfolio', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}` },
          body: JSON.stringify(portfolio)
      });

      return true;
  }


  const pushTransaction = async (transaction) => {

    const token = await getAccessTokenSilently();


     // attempting to save transaction
      const response = await fetch('/api/portfolio/transaction', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json',
                      'Authorization': `Bearer ${token}` },
          body: JSON.stringify(transaction)
      });

      return true;
  }

  const handleSubmit = (e) => {
    e.preventDefault();


    if (typeof portfolio !== "undefined") {
      
      const updatedPortfolio = Object.assign(
        {},
        {
          ...portfolio,
          transactions: [].concat(portfolio.transactions)
        },
      );

      const newTransaction = {
        'symbol': symbol,
        'exchange': exchange,
        'quantity': qty,
        'price': price,
      }

      updatedPortfolio.transactions = Object.assign([]);
    
      updatedPortfolio.transactions.push(
        ...portfolio.transactions,
        {
        'symbol': symbol,
        'exchange': exchange,
        'quantity': qty,
        'price': price,
      });


      console.log('updated portfolio is', updatedPortfolio);



      dispatch(replacePortfolio(updatedPortfolio));

      pushTransaction(newTransaction);



    } else {


      // Initialize portfolio locally
      const transactions = [];

      transactions.push({
        'symbol': symbol,
        'exchange': exchange,
        'quantity': qty,
        'price': price
      });

      const newPortfolio = {
        name: "My Portfolio",
        transactions: transactions,
      };

      dispatch(replacePortfolio(newPortfolio));


      if(isAuthenticated && !isLoading){

        console.log('sending', newPortfolio);
        createPortfolio(newPortfolio);
      
      }



    }

    
  };

  return (
    <React.Fragment>
            <Typography
              variant="h6"
              component="span"
              gutterBottom
              className="stock_holdings__details__header drawer__details__header"
            >
              Add a transaction
            </Typography>

    <Paper className="add_transaction drawer__details paper">
    
        <form
          className="add_transaction__form"
          key={`${symbol}:${exchange}`}
          autoComplete="off"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div>
            <TextField
              required
              label="Quantity"
              type="number"
              variant="outlined"
              value={qty}
              name="quantity"
              inputProps={{
                min: 1
              }}
              onChange={(e) => setQty(parseFloat(e.target.value))}
              className="add_transaction__input"
              InputLabelProps={{
                shrink: true,
              }}
            />

            <TextField
              required
              label={`Price (${currency})`}
              type="number"
              variant="outlined"
              className="add_transaction__input"
              name="price"
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
              InputLabelProps={{
                shrink: true,
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              className="button add_transaction__button"
              startIcon={<QueueIcon />}
            >
              Add
            </Button>
          </div>
        </form>
 
    </Paper>


    <HoldingsStock stock={{symbol,
      exchange,
      stockPrice,
      currency,
      close}}
      portfolio={portfolio}
      />
</React.Fragment>
  );
}
