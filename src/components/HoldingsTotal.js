import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { replacePortfolio } from "../actions";
import getQuoteDetails from "./StockDetails";

import {
  Card,
  CardHeader,
  CardContent,
  Button,
  CardActions,
  Box,
  Collapse,
  IconButton,
  TableBody,
  Table,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from "@material-ui/core/";

import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import RemoveIcon from "@material-ui/icons/Remove";
import TimelineIcon from "@material-ui/icons/Timeline";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import TocIcon from "@material-ui/icons/Toc";

import ReceiptIcon from "@material-ui/icons/Receipt";

import { Chip } from "@material-ui/core";

import "../css/HoldingsStock.css";
import { PlaylistAdd } from "@material-ui/icons";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function HoldingsTotal() {
  const portfolio = useSelector((state) => state.portfolio).portfolio;
  const [holdingsWithQuotes, setHoldingsWithQuotes] = useState(undefined);
  const [holdingSymbols, setHoldingSymbols] = useState(undefined);

  const getStockDetails = async (symbols) => {

    const promises = symbols.map(async (stock) => {

        const response = await fetch('/api/quote?symbol='+stock.symbol+':'+stock.exchange, {
          method: 'GET'
        });
    
        const resp = await response.json();
    
        if(resp.hasOwnProperty('symbol') && resp) return resp;
      
      });
      


      
   return await Promise.all(promises);

};


  useEffect(() => {
  if (holdingSymbols) {
    setHoldingsWithQuotes(getStockDetails(holdingSymbols));
    }   
  }, []);

  let shares = 0,
    spent = 0,
    total = 0;


  if (typeof portfolio !== "undefined") {
      
    const foundTotalPortofolio = Object.assign(
      {},
      {
        ...portfolio,
        transactions: [].concat(portfolio.transactions),
      }
    );

    // @todo add this to the portfolio reducer

    const holdings = foundTotalPortofolio.transactions;


    let holdingMerged = [];

    if (holdings.length) {
      for (let item of holdings) {
        let key = item.symbol + ":" + item.exchange;

        if (typeof holdingMerged[key] == "undefined") {
          holdingMerged[key] = {
            quantity: item.quantity,
            price: item.price,
          };
        } else {
            holdingMerged[key].symbol = item.symbol;
            holdingMerged[key].exchange = item.exchange;
            holdingMerged[key].price += item.price;
            holdingMerged[key].quantity += item.quantity;
        }

        spent += item.price * item.quantity;
        total += item.price * item.quantity;
      }


      if(!holdingSymbols) setHoldingSymbols(holdingMerged);

      const totalReturn = 0;
      const totalReturnPercentage = 0;


      if (Math.sign(totalReturn) !== 0) {
        const changeElement =
          Math.sign(totalReturn) == 1 ? (
            <Avatar className="stock__change__icon positive">
              <ArrowUpwardIcon />
            </Avatar>
          ) : (
            <Avatar className="stock__change__icon negative">
              <ArrowDownwardIcon />
            </Avatar>
          );
      }else{
        const changeElement = (
            <Avatar className="stock__change__icon neutral">
              <RemoveIcon />
            </Avatar>
          );
      }

      holdings.sort((a, b) =>
        a.quantity * a.price > b.quantity * b.price
          ? -1
          : b.quantity * b.price > a.quantity * a.price
          ? 1
          : 0
      );





    if(holdingsWithQuotes){


 
        return(
            <React.Fragment>
            <Card className="stock_holdings__details">
              <CardHeader
                className="drawer__details__header"
                title="Your Portfolio"
              ></CardHeader>
      
              <Paper>
                <CardContent className="stock_holdings__details drawer__details paper">
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="stock__summary__icon average">
                          <TocIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={formatter.format(spent.toFixed(2))}
                        secondary="Total invested"
                      />
                    </ListItem>
      
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="stock__summary__icon total">
                          <PlaylistAddIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        component="h3"
                        primary={formatter.format(total.toFixed(2))}
                        secondary="Total value"
                      />
                    </ListItem>
      
                    <ListItem>
                      <ListItemAvatar></ListItemAvatar>
                      <ListItemText
                        component="h2"
                        primary={`${formatter.format(
                          totalReturn
                        )} (${totalReturnPercentage}%)`}
                        secondary="Total return"
                      />
                    </ListItem>
                  </List>
                </CardContent>
              </Paper>
            </Card>
          </React.Fragment>
    
        )
    
    
      }


    }









  }

  return null;



}

export default HoldingsTotal;
