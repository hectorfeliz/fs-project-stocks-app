import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { replacePortfolio } from "../actions";
import getCurrentPrice from "./getCurrentPrice";
import { useAuth0 } from '@auth0/auth0-react';

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

  const {
    isLoading,
    isAuthenticated,
  } = useAuth0();


  const getStockDetails = async () => {

      for (let key in holdingSymbols) {
        let stockRefresh = await getCurrentPrice(holdingSymbols[key]);
        holdingSymbols[key].quote = stockRefresh.close;
      }

      console.log('*************', holdingSymbols);

      setHoldingsWithQuotes(holdingSymbols);
    
  };

  useEffect(() => {
 
    getStockDetails();

  }, [portfolio]);

  let totalShares = 0,
    totalSpent = 0,
    total = 0;


  if (typeof portfolio !== "undefined") {
    const foundTotalPortofolio = Object.assign(
      {},
      {
        ...portfolio,
        transactions: [].concat(portfolio.transactions),
      }
    );

    const holdings = foundTotalPortofolio.transactions;

    let holdingMerged = [];

    if (holdings.length) {
      for (let item of holdings) {
        let key = item.symbol + ":" + item.exchange;

        if (typeof holdingMerged[key] == "undefined") {
          holdingMerged[key] = {
            symbol: item.symbol,
            exchange: item.exchange,
            quantity: item.quantity,
            price: item.price,
            spent: item.price * item.quantity
          };
        } else {
   
          holdingMerged[key].price += item.price;
          holdingMerged[key].spent += item.price * item.quantity;
          holdingMerged[key].quantity += item.quantity;

        }

        totalSpent += item.price * item.quantity;
     
      }


  
     
      if (!holdingSymbols) setHoldingSymbols(holdingMerged);

     

      

      holdings.sort((a, b) =>
        a.quantity * a.price > b.quantity * b.price
          ? -1
          : b.quantity * b.price > a.quantity * a.price
          ? 1
          : 0
      );

     


      if (!holdingsWithQuotes && portfolio) {



        return (
          <React.Fragment>
          <Card className="stock_holdings__details">
            <CardHeader
              className="drawer__details__header"
              title="Your Portfolio"
              subheader="Calculating"

            ></CardHeader>
                     </Card>
          </React.Fragment>
        );
      }

      if (holdingsWithQuotes) {

        console.log('---------------> processing holdings with quotes');
        console.log(holdingsWithQuotes);


        let totalReturn = 0
        let totalReturnPercentage = 0;



        for (let key in holdingsWithQuotes) {
  
          let item = holdingsWithQuotes[key];
          console.log('analysinz', item);
  
          totalReturn += (item.quantity * parseFloat(item.quote) - item.spent);
          total += parseFloat(item.quote) * item.quantity;


        }


        console.log('calculating percentage', totalReturn, total);
        totalReturnPercentage = ((totalReturn / total ) * 100).toFixed(2);
  
  
        console.log("holdings with quotes");
        console.log(holdingsWithQuotes);
        console.log('total return is', totalReturn);

        let changeElement = '';

        if (Math.sign(totalReturn) !== 0) {
          changeElement  =
            Math.sign(totalReturn) == 1 ? (
              <Avatar className="stock__change__icon positive">
                <ArrowUpwardIcon />
              </Avatar>
            ) : (
              <Avatar className="stock__change__icon negative">
                <ArrowDownwardIcon />
              </Avatar>
            );
        } else {
          changeElement = (
            <Avatar className="stock__change__icon neutral">
              <RemoveIcon />
            </Avatar>
          );
        }

      
        return (


          
          <React.Fragment>
            <Card className="stock_holdings__details">
              <CardHeader
                className="drawer__details__header"
                title="Your Portfolio"
              ></CardHeader>

              <Paper>
                <CardContent className=" drawer__details paper">
                  <List>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar className="stock__summary__icon average">
                          <TocIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={formatter.format(totalSpent.toFixed(2))}
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
                    <ListItemAvatar>{changeElement}</ListItemAvatar>
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
        );
      }
    }
  }

  return null;
}

export default HoldingsTotal;
