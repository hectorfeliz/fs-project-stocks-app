import React from "react";
import { useState, useEffect } from "react";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import StockDrawer from "./StockDrawer";
import Container from "@material-ui/core/Container";

import "../css/Stock.css";

import {
  makeStyles,
  CardContent,
  Grid,
  Card,
  SwipeableDrawer,
  Typography,
  Chip,
  DialogTitle,
  IconButton,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: "#1A3453",
    borderRadius: 3,
    color: "#ffffff",
    padding: "2px",
    boxShadow: "0 3px 5px 2px rgba(255, 255, 255, .3)",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Stock({ symbol, exchange, name, price, change, currency, details }) {
  const classes = useStyles(),
    targetIdentifier =
      symbol.replace(/\s+/g, "-").toLowerCase() +
      ":" +
      exchange.replace(/\s+/g, "-").toLowerCase(),
    changeClass = parseFloat(change) > 0 ? "negative" : "positive",
    changeElement =
      parseFloat(change) > 0 ? (
        <Chip
          className="stock__change positive"
          label={`${parseFloat(change).toFixed(3)}`}
          icon={<ArrowUpwardIcon />}
        />
      ) : (
        <Chip
          className="stock__change negative"
          label={`${parseFloat(change).toFixed(3)}`}
          icon={<ArrowDownwardIcon />}
        />
      );

  const [state, setState] = useState({
    [targetIdentifier]: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  return (
    <Grid item xs={12} sm={12} md={6} lg={4}>
      <React.Fragment>
        <Card
          className={`stock ${classes.root} ${targetIdentifier}`}
          onClick={toggleDrawer(targetIdentifier, true)}
          onKeyDown={toggleDrawer(targetIdentifier, true)}
        >
          <CardContent className={`${changeClass} stock_inner`}>
            <Typography className="stock__exchange" component="span">
              {exchange}
            </Typography>

            <Typography className="stock__name" component="span">
              {name}
            </Typography>

            <Typography
              className="stock__symbol"
              gutterBottom
              variant="h3"
              component="div"
            >
              {symbol}
            </Typography>

            <Typography
              className="stock__price"
              variant="h5"
              component="span"
              title={currency}
            >
              {formatter.format(parseFloat(price))} {changeElement}
            </Typography>
          </CardContent>
        </Card>

        <SwipeableDrawer
          className="stock__drawer__container"
          anchor="bottom"
          open={state[targetIdentifier]}
          onClose={toggleDrawer(targetIdentifier, false)}
          onOpen={toggleDrawer(targetIdentifier, true)}
        >
          <DialogTitle disableTypography className="stock__drawer__header">
            <Container spacing={3} fixed>
              <Typography
                variant="h5"
                component="span"
                gutterBottom
                className="stock__drawer__header__title"
              >
                Stock details
              </Typography>

              <IconButton onClick={toggleDrawer(targetIdentifier, false)}>
                <CloseIcon />
              </IconButton>
            </Container>
          </DialogTitle>

          <StockDrawer details={details} changeElement={changeElement} />
        </SwipeableDrawer>
      </React.Fragment>
    </Grid>
  );
}

export default Stock;
