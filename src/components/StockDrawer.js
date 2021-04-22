import React from 'react';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';

import Paper from '@material-ui/core/Paper';

import Grid from '@material-ui/core/Grid';

import '../css/StockDrawer.css';

var formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

function StockDrawer({details, changeElement}) {
  


    return (
        <div className="drawer" color="#fff">
            <Container className="drawer__inner">

            <Grid container spacing={3} className="drawer__header">
                        

            <Grid item md={6} xs={12}>
                        <Typography className="stock__name" variant="p" component="p">
                            {details.name}
                        </Typography>
                        <Typography className="stock__symbol" color="#fff" gutterBottom variant="h3" component="div"> 
                                        {details.symbol}
                        </Typography>
                      
            </Grid>


            <Grid item md={4} xs={12}>
            <Typography className="stock__price" variant="h5" component="p" title={details.currency}>
                            {formatter.format(parseFloat(details.close))}   {changeElement}
                        </Typography>   
            </Grid>
    
                </Grid>

 
                <Divider  />

                <Typography variant="h6" component="span" gutterBottom className="drawer__details__header" >
                    Market Details
                </Typography>

                <Paper className="drawer__details paper">


                <List className="">

                <Grid container spacing={0}>

                    <Grid item md={6} xs={12}>
                            <ListItem>
                                <ListItemText className="drawer__details__info" primary="Open" secondary={formatter.format(parseFloat(details.open))}  />
                            </ListItem>
                            <Divider />


                            <ListItem>
                                <ListItemText className="drawer__details__info" primary="Close" secondary={formatter.format(parseFloat(details.close))}  />
                            </ListItem>
                            <Divider />


                            <ListItem>
                                <ListItemText className="drawer__details__info" primary="High" secondary={formatter.format(parseFloat(details.high))}  />
                            </ListItem>
                            <Divider />


                            <ListItem>
                                <ListItemText className="drawer__details__info" primary="Low" secondary={formatter.format(parseFloat(details.low))}  />
                            </ListItem>
                            <Divider />


                            <ListItem>
                                <ListItemText className="drawer__details__info" primary="Previous Close" secondary={formatter.format(parseFloat(details.previous_close))}  />
                            </ListItem>
                            <Divider />

                    </Grid>
                    

                    <Grid item md={6} xs={12}>
                    <ListItem>
                            <ListItemText className="drawer__details__info" primary="52-Week high" secondary={formatter.format(parseFloat(details.fifty_two_week.high))}  />
                            </ListItem>
                            <Divider />

                            <ListItem>
                                <ListItemText className="drawer__details__info" primary="52-Week low" secondary={formatter.format(parseFloat(details.fifty_two_week.low))}  />
                            </ListItem>
                            <Divider />


                            <ListItem>
                                <ListItemText className="drawer__details__info" primary="Volume" secondary={formatter.format(parseFloat(details.volume))}  />
                            </ListItem>
                            <Divider />


                            <ListItem>
                                <ListItemText className="drawer__details__info" primary="Currency" secondary={details.currency}  />
                            </ListItem>
                            <Divider />

                            <ListItem>
                                <ListItemText className="drawer__details__info" primary="Exchange" secondary={details.exchange}  />
                            </ListItem>
                            <Divider />
        

                    </Grid>
            
                 </Grid>

                    
     
                </List>

                </Paper>
          
                <div className="drawer__actions">

                </div>

                        

                    
            </Container>
        </div>
    )
}

export default StockDrawer
