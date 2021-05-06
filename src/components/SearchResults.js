import React from "react";
import { useState, useEffect } from "react";
import Stock from "./Stock";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";

import theme from "../components/Theme";
import { useDispatch } from "react-redux";
import { replaceResults } from "../actions";

const useStyles = makeStyles((theme) => [theme]);

function SearchResults() {
  const results = useSelector((state) => state.results).results;
  const [expanded, setExpanded] = useState("panel-results");


  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : true);
  };

  if (typeof results == "undefined") {
    return <div></div>;
  }

  return (
    <Card className={`stock_list`}>
      <Accordion
        expanded={expanded === "panel-results"}
        onChange={handleChange("panel-results")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <CardHeader
            className="stock_list__header"
            title="Search Results"
          ></CardHeader>
        </AccordionSummary>

        <AccordionDetails>
          <CardContent className="stock_list__content">
            <Grid
              container
              spacing={4}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
            >
              {results.map((stock) => {
                return (
                  <Stock
                    key={`search:${stock.symbol}:${stock.exchange}`}
                    symbol={stock.symbol}
                    name={stock.name}
                    exchange={stock.exchange}
                    price={stock.close}
                    currency={stock.currency}
                    change={stock.percent_change}
                    details={stock}
                  />
                );
              })}
            </Grid>
          </CardContent>
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

export default SearchResults;
