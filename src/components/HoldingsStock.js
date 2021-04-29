import React from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {replacePortfolio} from '../actions';
import loadState from '../local_storage/load';




import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';


function HoldingsStock(stock) {


    console.log('-------------- HOLDINGS COMPONENT');


    const portfolio = useSelector(state =>  state.portfolio);
    const details = stock.details;
    const [open, setOpen] = React.useState(false);

    let shares = 0,
        total = 0;
        

    const mergeHoldings = (arr = []) => {
        const merged = arr.reduce((acc, obj) => {
           let found = false;
           for (let i = 0; i < acc.length; i++) {
              if (acc[i].price === obj.price) {
                 found = true;
                 acc[i].quantity += parseFloat(obj.quantity);
              };
           }
           if (!found) {
              obj.quantity = 1;
              acc.push(obj);
           }
           return acc;
        }, []);
        return merged;
     }


    if(portfolio){
        const holdings = portfolio.transactions.filter(function(transaction) {
            if(transaction.symbol === details.symbol && transaction.exchange === details.exchange) {
              return true;
            }
            return false;
          });


         


          if(holdings.length){

            const mergedHoldings = mergeHoldings(holdings);


            for(let item of mergedHoldings) {
                shares += item.quantity;
                total += parseFloat(item.price);
              }

            console.log(mergedHoldings);
            console.log('returnings....');
  
            return (
                <React.Fragment>
                <TableRow>
                <TableCell>

                <TableHead>
                <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Shares </TableCell>
                    <TableCell>Avg. Price</TableCell>
                    <TableCell>Total Value</TableCell>
                </TableRow>
                </TableHead>
                <TableRow>
                        <TableCell>
                            <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                                {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        </TableCell>
                        <TableCell >
                           {shares}             
                        </TableCell>

                        <TableCell >
                   
                        </TableCell>

                        <TableCell>
                            <strong> ${total.toFixed(2)}</strong>
                        </TableCell>
                      
                      
                    </TableRow>

               
                  
                <Collapse in={open} timeout="auto" unmountOnExit>
                      <Table size="small" aria-label="purchases">
                       
                        <TableBody>
                          {mergedHoldings.map((row) => (
                            <TableRow key={`${row.symbol}:${row.exchange}:${row.quantity}:${row.price}`}>
                             <TableCell></TableCell>
                              <TableCell align="right">{row.quantity}</TableCell>
                              <TableCell></TableCell>
                              <TableCell></TableCell>
                              <TableCell align="right">
                                ${parseFloat(row.price).toFixed(2)}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                </Collapse>
                 
                </TableCell>
              </TableRow>
              </React.Fragment>
           );


          }
          

    }
    return null;




}

export default HoldingsStock;
