import React from "react";
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
// clean up

import {
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  CardContent,
  Button,
  Typography,
  Container,
  DialogTitle,
  TextField,
  FormControl,
  FormHelperText,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FilledInput,
  Input,
  IconButton,
} from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

// clean

import AddTransaction from "./AddTransaction";

import "../css/StockDrawer.css";

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function StockDrawer({ details, changeElement }) {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="drawer">
      <Container className="drawer__inner">
        <Grid container spacing={3} className="drawer__header">
          <Grid item md={12} xs={12}>
            <Typography className="stock__name" component="span">
              {details.name}
            </Typography>
            <Typography
              className="stock__symbol"
              gutterBottom
              variant="h3"
              component="div"
            >
              {" "}
              {details.symbol}
            </Typography>

            <Typography
              className="stock__price"
              variant="h5"
              component="span"
              title={details.currency}
            >
              {formatter.format(parseFloat(details.close))} {changeElement}
            </Typography>
            <Typography
              className="stock__date"
              variant="h6"
              component="span"
              title={details.currency}
            >
              As of {details.datetime}
            </Typography>
          </Grid>

          <Grid item md={12} xs={12}>
            {isAuthenticated && (
            <AddTransaction
              exchange={details.exchange}
              symbol={details.symbol}
              stockPrice={parseFloat(details.close).toFixed(2)}
              currency={details.currency}
              close={details.close}
            />
            )}


            {!isAuthenticated && (
           
             <Paper className="drawer__details paper">
            <Typography
              variant="h6"
              component="span"
              gutterBottom
              className="drawer__details__header"
            >
              Please log in to add a transaction
            </Typography>

             </Paper>  
            

            )}
          </Grid>
        </Grid>

        <Typography
          variant="h6"
          component="span"
          gutterBottom
          className="drawer__details__header"
        >
          Market Details
        </Typography>

        <Paper className="drawer__details paper">
          <List className="" md={12} xs={12}>
            <Grid container>
              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="Open"
                    secondary={formatter.format(parseFloat(details.open))}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="Close"
                    secondary={formatter.format(parseFloat(details.close))}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="High"
                    secondary={formatter.format(parseFloat(details.high))}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="Low"
                    secondary={formatter.format(parseFloat(details.low))}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="Previous Close"
                    secondary={formatter.format(
                      parseFloat(details.previous_close)
                    )}
                  />
                </ListItem>
                <Divider />
              </Grid>

              <Grid item md={6} xs={12}>
                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="52-Week high"
                    secondary={formatter.format(
                      parseFloat(details.fifty_two_week.high)
                    )}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="52-Week low"
                    secondary={formatter.format(
                      parseFloat(details.fifty_two_week.low)
                    )}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="Volume"
                    secondary={formatter.format(parseFloat(details.volume))}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="Currency"
                    secondary={details.currency}
                  />
                </ListItem>
                <Divider />

                <ListItem>
                  <ListItemText
                    className="drawer__details__info"
                    primary="Exchange"
                    secondary={details.exchange}
                  />
                </ListItem>
                <Divider />
              </Grid>
            </Grid>
          </List>
        </Paper>
      </Container>
    </div>
  );
}

export default StockDrawer;
