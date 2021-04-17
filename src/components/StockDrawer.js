import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import '../css/StockDrawer.css';

function StockDrawer({symbol, exchange, name, price, change, currency}) {
    return (
        <div className="drawer" color="#fff">
            <Container className="drawer__inner">

                        <Typography className="stock__exchange" variant="p" component="strong">
                            {exchange}
                        </Typography>
                        
                        <Typography className="stock__name" variant="p" component="p">
                            {name}
                        </Typography>

                        <Typography className="stock__symbol" color="#fff" gutterBottom variant="h3" component="div"> 
                            {symbol}
                        </Typography>

                      

            </Container>
        </div>
    )
}

export default StockDrawer
