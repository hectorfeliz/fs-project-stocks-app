import React from 'react';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddBoxIcon from '@material-ui/icons/AddBox';
import QueueIcon from '@material-ui/icons/Queue';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import '../css/AddTransaction.css';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {replacePortfolio} from '../actions';
import loadState from '../local_storage/load';
import saveState from '../local_storage/save';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';


export default function AddTransaction({symbol, exchange, stockPrice, currency}) {

    const [quantity, setQuantity] = useState("1");
    const [price, setPrice] = useState(stockPrice);
    const [portfolioExists, setportfolioExists] = useState(false);
    const dispatch = useDispatch();


    console.log('QUANTITY IS');
    console.log(quantity);

    console.log('-- add transaction app');


    const portfolio = useSelector(state =>  state.portfolio);
    console.log(portfolio);
    console.log('-- ******** use selector ^^^^');
    
 
    const handleSubmit= (e) => {
        e.preventDefault();
        const persistedState = loadState();

        console.log('handle submit....');
        console.log(persistedState);
    
        if(portfolio) {
          setportfolioExists(true);
        }else{
          setportfolioExists(false);
        }


        if(portfolioExists){

          const updatePortfolio = persistedState.portfolio;

          updatePortfolio.transactions.push({
              symbol,
              exchange,
              quantity,
              price,
          });

          console.log('PORTFOLIO EXISTS *********');
          console.log(updatePortfolio);

          dispatch(replacePortfolio(updatePortfolio));

          persistedState.portfolio = updatePortfolio;
          saveState(persistedState);

        }else{

          // Initialize portfolio locally
          let transactions=[];
                
          transactions.push({
              symbol,
              exchange,
              quantity,
              price,
          });

          let portfolio = {
              name: "My Portfolio",
              transactions
          }

          

          console.log('PORTFOLIO INITIALIZED *********');
          console.log(portfolio);

          let persistedState = loadState();
          saveState(persistedState);

        }


    }

  return (

      
    <Card className="add_transaction paper">
    <CardHeader className="stock_list__header" 
                 title="Add a transaction">
    </CardHeader>     
    <CardContent className="add_transaction__form__container">
     <form className="add_transaction__form" key={`${symbol}:${exchange}`} 
      autoComplete="off" onSubmit={e => { handleSubmit(e) }}>
      <div>
        
        <TextField
          required
          label="Quantity"
          type="number"
          variant="outlined"
          InputProps={{ inputProps: { min: 0}}}
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
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
          value={price}
      
          onChange={e => setPrice(e.target.value)}
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
    </CardContent>
    </Card>
  );
}