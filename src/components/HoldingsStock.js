import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { replacePortfolio } from "../actions";

import {
  Button,
  CardContent,
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

function HoldingsStock({ stock, portfolio }) {
  const [open, setOpen] = useState(false);

  let shares = 0,
    spent = 0,
    total = 0;

  const mergeHoldings = (arr = []) => {
    const merged = arr.reduce((accumulated, current) => {
      let found = false;

      for (let i = 0; i < accumulated.length; i++) {
        if (accumulated[i].price === current.price) {
          found = true;
          accumulated[i].quantity += parseFloat(current.quantity);
        }
      }

      if (!found) {
        accumulated.push(current);
      }

      return accumulated;
    }, []);

    return merged;
  };

  if (typeof portfolio !== "undefined") {
    const foundPortofolio = Object.assign(
      {},
      {
        ...portfolio,
        transactions: [].concat(portfolio.transactions),
      }
    );

    // @todo add this to the portfolio reducer
    const holdings = foundPortofolio.transactions.filter(function (
      transaction
    ) {
      if (
        transaction.symbol === stock.symbol &&
        transaction.exchange === stock.exchange
      ) {
        return true;
      }
      return false;
    });

    if (holdings.length) {
      const mergedHoldings = holdings;

      for (let item of mergedHoldings) {
        shares += item.quantity;
        spent += item.price * item.quantity;
        total += stock.close * item.quantity;
      }

      const weightedAvg = spent / shares;
      const totalReturn = (shares * parseFloat(stock.close) - spent).toFixed(2);
      const totalReturnPercentage = (
        (totalReturn / (shares * parseFloat(stock.close))) *
        100
      ).toFixed(3);

      let changeElement = (
        <Avatar className="stock__change__icon neutral">
          <RemoveIcon />
        </Avatar>
      );

      if (Math.sign(totalReturn) !== 0) {
        changeElement =
          Math.sign(totalReturn) == 1 ? (
            <Avatar className="stock__change__icon positive">
              <ArrowUpwardIcon />
            </Avatar>
          ) : (
            <Avatar className="stock__change__icon negative">
              <ArrowDownwardIcon />
            </Avatar>
          );
      }

      mergedHoldings.sort((a, b) =>
        a.quantity * a.price > b.quantity * b.price
          ? -1
          : b.quantity * b.price > a.quantity * a.price
          ? 1
          : 0
      );

      return (
        <React.Fragment>
          <Typography
            variant="h6"
            component="span"
            gutterBottom
            className="stock_holdings__details__header drawer__details__header"
          >
            Summary
          </Typography>

          <Paper className="stock_holdings__details drawer__details paper">
            <List>
              <ListItem>
                <ListItemAvatar>
                  <Avatar className="stock__summary__icon shares">
                    <ReceiptIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={shares} secondary="Shares" />
              </ListItem>

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
                  <Avatar className="stock__summary__icon average">
                    <TimelineIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={formatter.format(weightedAvg.toFixed(2))}
                  secondary="Average price"
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

            <CardActions>
              <Button
                size="large"
                color="secondary"
                endIcon={
                  open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
                }
                onClick={() => setOpen(!open)}
              >
                View Transactions
              </Button>
            </CardActions>

            <Collapse in={open} timeout="auto" unmountOnExit>
              <Table size="small" aria-label="purchases">
                <TableHead className="stock_holdings__tablehead">
                  <TableRow>
                    <TableCell width="15%">Shares</TableCell>

                    <TableCell width="45%">Price</TableCell>

                    <TableCell width="40%">Value</TableCell>
                  </TableRow>
                </TableHead>
              </Table>

              <Table size="small" aria-label="purchases">
                <TableBody>
                  {mergedHoldings.map((row, k) => (
                    <TableRow
                      key={`${row.symbol}:${row.exchange}:${row.quantity}:${row.price}:${k}`}
                    >
                      <TableCell width="15%">{row.quantity}</TableCell>
                      <TableCell width="45%">
                        x {formatter.format(parseFloat(row.price).toFixed(2))}
                      </TableCell>

                      <TableCell width="40%">
                        {formatter.format(
                          parseFloat(
                            parseFloat(row.price) * row.quantity
                          ).toFixed(2)
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Collapse>
          </Paper>
        </React.Fragment>
      );
    }
  }
  return null;
}

export default HoldingsStock;
