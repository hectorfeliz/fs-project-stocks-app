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

import { useSelector, useDispatch } from 'react-redux';
import {replacePortfolio} from '../actions';
import loadState from '../local_storage/load';

const useStyles = makeStyles((theme) => ([theme]));

function PortfolioList() {

    
    const [expanded, setExpanded] = useState('panel-portfolio');

    const PortfolioList = [];


    
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };

    const classes = useStyles();
    if(!PortfolioList.length){
    return (
        <Card className={`${classes.root} stock_list portfolio`} >
        <CardHeader className="stock_list__header" 
                 title="Your Portfolio"
                 subheader="Add stocks from Search or Popular">
             </CardHeader>    
         </Card>
     );
    }

  
    return (
        <Card className={`${classes.root} stock_list portfolio`}>
            <Accordion expanded={expanded === 'panel-portfolio'} onChange={handleChange('panel-portfolio')}>
                
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <CardHeader className="stock_list__header" title="Your Portfolio">
                </CardHeader>
                </AccordionSummary>

                <AccordionDetails>
                <CardContent className="stock_list__content">
                 <Grid
                container
                direction="row"
                justify="flex-start"
                alignItems="flex-start">

                   {

                PortfolioList.map((stock) => {
                        return(
                            <Stock 
                            key={`portfolio:${stock.symbol}:${stock.exchange}`}
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

export default PortfolioList
