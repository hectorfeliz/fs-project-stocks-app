import React from 'react';
import { useState, useEffect } from 'react';
import Stock from './Stock';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../components/Theme';

const useStyles = makeStyles((theme) => ([theme]));

function SearchResults() {

    const classes = useStyles();

    const results = useSelector(state =>  state.results);

    if(!results.length){
        return (
            <div></div>
        );
    }

    return (
        <Card className={`${classes.root} stock_list`} >

                <CardHeader className="stock_list__header" 
                    title="Search Results">
                </CardHeader>    
                 <CardContent className="stock_list__content">


                <Grid
                container
                spacing={4}
                direction="row"
                justify="flex-start"
                alignItems="flex-start">

                   {

                      results.map((stock) => {
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

        </Card>
    )
}

export default SearchResults;
