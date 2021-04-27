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

    const [quantity, setQuantity] = useState(1);
    const [price, setPrice] = useState(stockPrice);


    const dispatch = useDispatch();
 
    const handleSubmit= (e) => {
        e.preventDefault();
        let persistedState = loadState();

  

  
        if(persistedState) {
            if(persistedState.portfolio){
        
      
              const updatePortfolio = persistedState.portfolio;
    
      
              updatePortfolio.transactions.push({
                  symbol,
                  exchange,
                  quantity,
                  price,
              });
      
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

              persistedState.portfolio = portfolio;
              saveState(persistedState);



            }
        }


        

   
     

      

    }

  return (

      
    <Card className="add_transaction paper">
    <CardHeader className="stock_list__header" 
                 title="Add a transaction">
    </CardHeader>     
    <CardContent className="add_transaction__form__container">
     <form className="add_transaction__form" key={`${symbol}:${exchange}`}  autoComplete="off" onSubmit={e => { handleSubmit(e) }}>
      <div>
        
        <TextField
          required
          id="standard-number"
          label="Quantity"
          type="number"
          variant="outlined"
          defaultValue="1"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="add_transaction__input"
        
          InputLabelProps={{
            shrink: true,
          }}
        />
       
       <TextField
          required
          id="standard-number"
          label={`Price (${currency})`}
          type="number"
          variant="outlined"
          className="add_transaction__input"
          defaultValue={stockPrice}
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