import React from 'react';
import { useState, useEffect } from 'react';
import Stock from './Stock';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../components/Theme';
import getQuoteDetails from './StockDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ([theme]));

function PopularStocks() {

    const [popularStocks, setPopularStocks] = useState('');
    const [expanded, setExpanded] = useState('panel-popular');

    const popular = [{
        "symbol":"GSPC",
        "name":"S&P 500",
        "exchange":"NYSE",
    },
    {
        "symbol":"AMZN",
        "name":"Amazon.com Inc",
        "exchange":"NASDAQ",
    },
    {
        "symbol":"AAPL",
        "name":"Apple Inc",
        "exchange":"NASDAQ",
           
    },
    {
        "symbol":"MSFT",
        "name":"Microsoft Corp",
        "exchange":"NASDAQ",
    },
    {
        "symbol":"FB",
        "name":"Facebook Inc",
        "exchange":"NASDAQ",
    },
    {
        "symbol":"GOOGL",
        "name":"Alphabet Inc",
        "exchange":"NASDAQ",
    },
    {
        "symbol":"TSLA",
        "name":"Tesla Inc",
        "exchange":"NASDAQ",
    },
    {
        "symbol":"BRK.B",
        "name":"Berkshire Hathaway Inc",
        "exchange":"NYSE",
    },
    {
        "symbol":"JPM",
        "name":"JPMorgan Chase & Co",
        "exchange":"NYSE"
    },
    {
        "symbol":"V",
        "name":"Visa Inc",
        "exchange":"NYSE",
    },
    {
        "symbol":"DJI",
        "name":"Dow Jones Industrial Average",
        "exchange":"NYSE",
    },
    {
        "symbol":"GLD",
        "name":"SPDR Gold Shares",
        "exchange":"NYSE",
    },
    {
        "symbol":"GE",
        "name":"General Electric Co",
        "exchange":"NYSE",
    },
    {
        "symbol":"IXIC",
        "name":"NASDAQ Composite",
        "exchange":"NASDAQ",
    },
    {
        "symbol":"SHOP",
        "name":"Shopify Inc",
        "exchange":"NYSE"
    }];

    useEffect(() => {
        if (!popularStocks) {
            getPopularStocks();
        }
      }, []);


    const getPopularStocks = async () => { 

        const stocks = await getQuoteDetails(popular);
        console.log(stocks);
        setPopularStocks(stocks);
        setExpanded('panel-popular');

    };

    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    const classes = useStyles();
    if(!popularStocks.length){
    return (
        <Card className={`${classes.root} stock_list`} >
        <CardHeader className="stock_list__header" 
                 title="Popular Stocks"
                 subheader="Loading">
             </CardHeader>    
         </Card>
     );
    }

  
    return (
        <Card className={`${classes.root} stock_list`}>
            <Accordion expanded={expanded === 'panel-popular'} onChange={handleChange('panel-popular')}>
                
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <CardHeader className="stock_list__header" title="Popular Stocks">
                </CardHeader>
                </AccordionSummary>

                <AccordionDetails>
                <CardContent className="stock_list__content">
                 <Grid
                container
                spacing={4}
                direction="row"
                justify="flex-start"
                alignItems="flex-start">

                   {

                popularStocks.map((stock) => {
                        return(
                            <Stock 
                            symbol={stock.symbol}
                            name={stock.name}
                            exchange={stock.exchange}
                            price={stock.close}
                            currency={stock.currency}
                            change={stock.percent_change}
                            details={stock}
                            />
                        )

                    })

                }    

                </Grid>
                </CardContent>
                </AccordionDetails>
                </Accordion>
        </Card>
    )
    
}

export default PopularStocks
