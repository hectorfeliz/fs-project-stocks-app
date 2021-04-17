import React from 'react';
import { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import Chip from '@material-ui/core/Chip';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import StockDrawer from './StockDrawer';

import '../css/Stock.css';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        background: '#1A3453',
        borderRadius: 3,
        color: '#fff',
        padding: '2px',
        boxShadow: '0 3px 5px 2px rgba(255, 255, 255, .3)',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    pos: {
      marginBottom: 12,
    },
  });

 


function Stock({symbol, exchange, name, price, change, currency}) {
    const classes = useStyles(),
          targetIdentifier = symbol.replace(/\s+/g, '-').toLowerCase() + '-' + exchange.replace(/\s+/g, '-').toLowerCase(),
          changeClass  = (parseFloat(change) > 0) ? 'negative' : 'positive',
          changeElement  = (parseFloat(change) > 0)
            ? <Chip className="stock__change negative" color="negative" label={`${parseFloat(change).toFixed(3)}`} icon={<ArrowUpwardIcon />} /> 
            : <Chip className="stock__change positive" color="positive" label={`${parseFloat(change).toFixed(3)}`} icon={<ArrowDownwardIcon />} />;

            const [state, setState] = useState({
                targetIdentifier: false,
              });
            
            const toggleDrawer = (anchor, open) => (event) => {
                
                
                if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                  return;
                }

                setState({ ...state, [anchor]: open });
            };
            
        return (
        <Grid item xs={12} sm={6} md={4} lg={3} >

            <React.Fragment key={targetIdentifier}>
                <Card color="#fff" className={`stock ${classes.root}`}
                        key={targetIdentifier}
                        onClick={toggleDrawer(targetIdentifier, true)}
                        onKeyDown={toggleDrawer(targetIdentifier, true)} >
                
                    <CardContent className={`${changeClass} stock_inner`}>

                        <Typography className="stock__exchange" variant="p" component="strong">
                            {exchange}
                        </Typography>
                        
                        <Typography className="stock__name" variant="p" component="p">
                            {name}
                        </Typography>

                        <Typography className="stock__symbol" color="#fff" gutterBottom variant="h3" component="div"> 
                            {symbol}
                        </Typography>

                        <Typography className="stock__price" variant="h5" component="p" title={currency}>
                            {formatter.format(parseFloat(price))}       {changeElement}
                        </Typography>


                    </CardContent>
                </Card>

                <SwipeableDrawer
                className="stock__drawer__container"
                anchor="bottom"
                open={state[targetIdentifier]}
                onClose={toggleDrawer(targetIdentifier, false)}
                onOpen={toggleDrawer(targetIdentifier, true)} >
           
                <StockDrawer 
                 symbol={symbol}
                 name={name}
                 exchange={exchange}
                />

            </SwipeableDrawer>
            </React.Fragment>
        </Grid>

      
    )
}

export default Stock;
