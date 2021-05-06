const getCurrentPrice = async (stock) => {

    console.log('fetching price for *******', stock);

    const response = await fetch("/api/quote?symbol=" + stock.symbol + ":" + stock.exchange,
      {
        method: "GET",
      }
    );

    return await Promise.resolve(response.json());

};

export default getCurrentPrice;

