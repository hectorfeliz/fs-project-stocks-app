import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import "../css/Footer.css";

function Footer() {
    return (
    <footer className="footer">
     <Container fixed>

     <Typography className="footer_text" component="h3">
            Stocks Portfolio Web App by <a href="http://hector.tech/" target="_blank">Hector.TECH</a> <br/>
            View on <a href="https://github.com/hectorfeliz/fs-project-stocks-app" target="_blank">Github</a> <br/>
            For educational purposes only
    </Typography>
    
    <Typography className="footer_text disclaimer" component="h6">
           Stocks Quotes data provided by  <a href="https://twelvedata.com/" target="_blank">Twelve Data</a> <br/>
           This app is not intended for financial advise.
    </Typography>
    

      </Container>
    </footer>
    )
}

export default Footer;
