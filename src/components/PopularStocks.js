import React from 'react';
import { useState, useEffect } from 'react';
import Stock from './Stock';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function PopularStocks() {

    const [popular,setPopular] = useState([
        {
            "symbol":"GSPC",
            "name":"S&P 500",
            "exchange":"NYSE",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"4096.10986",
            "high":"4129.47998",
            "low":"4095.51001",
            "close":"4127.75977",
            "volume":"877550725",
            "previous_close":"4097.22021",
            "change":"30.53955",
            "percent_change":"0.74537"
        },
        {
            "symbol":"AMZN",
            "name":"Amazon.com Inc",
            "exchange":"NASDAQ",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"3304.69995",
            "high":"3372.19995",
            "low":"3288.89990",
            "close":"3372.19995",
            "volume":"4334600",
            "previous_close":"3299.30005",
            "change":"72.89990",
            "percent_change":"2.20956",
            "average_volume":"3028596",
        },
        {
            "symbol":"AAPL",
            "name":"Apple Inc",
            "exchange":"NASDAQ",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"129.80000",
            "high":"133.03999",
            "low":"129.47000",
            "close":"133.00000",
            "volume":"106513800",
            "previous_close":"130.36000",
            "change":"2.64000",
            "percent_change":"2.02516",
            "average_volume":"89743153", 
               
        },
        {
            "symbol":"MSFT",
            "name":"Microsoft Corp",
            "exchange":"NASDAQ",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"252.87000",
            "high":"255.99001",
            "low":"252.44000",
            "close":"255.85001",
            "previous_close":"253.25000",
            "change":"2.60001",
            "percent_change":"1.02666",
            "average_volume":"27234761"
        },
        {
            "symbol":"FB",
            "name":"Facebook Inc",
            "exchange":"NASDAQ",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"311.39999",
            "high":"314.73999",
            "low":"310.32999",
            "close":"312.45999",
            "volume":"15983000",
            "previous_close":"313.01999",
            "change":"-0.56000",
            "percent_change":"-0.17890",
            "average_volume":"19561510"
        },
        {
            "symbol":"GOOGL",
            "name":"Alphabet Inc",
            "exchange":"NASDAQ",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"2245.43994",
            "high":"2273.96997",
            "low":"2237.26001",
            "close":"2270.66992",
            "volume":"1304400",
            "previous_close":"2250.42993",
            "change":"20.23999",
            "percent_change":"0.89938",
            "average_volume":"1598654"
        },
        {
            "symbol":"TSLA",
            "name":"Tesla Inc",
            "exchange":"NASDAQ",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"677.77002",
            "high":"680.96997",
            "low":"669.42999",
            "close":"677.02002",
            "volume":"21402600",
            "previous_close":"683.79999",
            "change":"-6.77997",
            "percent_change":"-0.99151",
            "average_volume":"31010011"
        },
        {
            "symbol":"BRK.B",
            "name":"Berkshire Hathaway Inc",
            "exchange":"NYSE",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"264.22000",
            "high":"266.23999",
            "low":"263.35001",
            "close":"266.01001",
            "volume":"6052500",
            "previous_close":"263.51001",
            "change":"2.50000",
            "percent_change":"0.94873",
            "average_volume":"4749541"
        },
        {
            "symbol":"JPM",
            "name":"JPMorgan Chase & Co",
            "exchange":"NYSE",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"155.81000",
            "high":"157.03999",
            "low":"154.97000",
            "close":"156.28000",
            "volume":"12116500",
            "previous_close":"155.12000",
            "change":"1.16000",
            "percent_change":"0.74781",
            "average_volume":"14650092"
        },
        {
            "symbol":"V",
            "name":"Visa Inc",
            "exchange":"NYSE",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"221.00000",
            "high":"222.60001",
            "low":"219.50999",
            "close":"222.52000",
            "volume":"5720000",
            "previous_close":"220.70000",
            "change":"1.82001",
            "percent_change":"0.82465",
            "average_volume":"7794596"
        },
        {
            "symbol":"DJI",
            "name":"Dow Jones Industrial Average",
            "exchange":"NYSE",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"33526.19141",
            "high":"33810.87109",
            "low":"33526.19141",
            "close":"33794.33984",
            "volume":"145285646",
            "previous_close":"33504.03125",
            "change":"290.30859",
            "percent_change":"0.86649",
            "average_volume":"328483138"
        },
        {
            "symbol":"GLD",
            "name":"SPDR Gold Shares",
            "exchange":"NYSE",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"162.77000",
            "high":"163.53000",
            "low":"162.48000",
            "close":"163.28999",
            "volume":"3799235",
            "previous_close":"164.50999",
            "change":"-1.22000",
            "percent_change":"-0.74160",
            "average_volume":"6600242" 
        },
        {
            "symbol":"GE",
            "name":"General Electric Co",
            "exchange":"NYSE",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"13.50000",
            "high":"13.83000",
            "low":"13.42000",
            "close":"13.60000",
            "volume":"63121500",
            "previous_close":"13.45000",
            "change":"0.15000",
            "percent_change":"1.11525",
            "average_volume":"53486550"
        },
        {
            "symbol":"IXIC",
            "name":"NASDAQ Composite",
            "exchange":"NASDAQ",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"13790.47461",
            "high":"13905.29492",
            "low":"13748.34863",
            "close":"13895.10449",
            "volume":"1577205516",
            "previous_close":"13829.19434",
            "change":"65.91016",
            "percent_change":"0.47660",
            "average_volume":"12066501594"
        },
        {
            "symbol":"SHOP",
            "name":"Shopify Inc",
            "exchange":"NYSE",
            "currency":"USD",
            "datetime":"2021-04-09",
            "open":"1212.00000",
            "high":"1234.50000",
            "low":"1190.16003",
            "close":"1227.30005",
            "volume":"1234800",
            "previous_close":"1222.68994",
            "change":"4.61011",
            "percent_change":"0.37705",
            "average_volume":"325161651",
        }
    ]);

    const fetchPopular = async () => {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=100');
        if(response.ok){

            const data = await response.json();
            console.log(data);
            setPopular(data.results);

        }else{
            console.log('bad response');
        }
    }

   
    console.log(popular);


    return (
        <div class="popular_stocks">

                <Typography color="#fff" gutterBottom variant="h3" component="div"> 
                 Popular Stocks
                </Typography>

                <Grid
                container
                spacing={4}
                direction="row"
                justify="flex-start"
                alignItems="flex-start">

                   {

                    popular.map((stock) => {
                        return(
                            <Stock 
                            symbol={stock.symbol}
                            name={stock.name}
                            exchange={stock.exchange}
                            price={stock.close}
                            currency={stock.currency}
                            change={stock.percent_change}
                            />
                        )

                    })

                }    

                </Grid>

        </div>
    )
}

export default PopularStocks
