const Binance = require('node-binance-us-api')

const binance = Binance().options({
    APIKEY: process.env.API_KEY,
    APISECRET: process.env.P3RIVATE_KEY
});

// TODO: cli-table output https://github.com/Automattic/cli-table
async function get_portfolio(console_output = false) {
    let totalCurrentValue = 0
    let balance_list = []
    let ticker = await binance.prices()
    let balances = await binance.balance()

    for (let key in balances) {
        let balance_summary = balances[key]
        let available = Number(balance_summary.available)
        let onOrder = Number(balance_summary.onOrder)
        let usdPrice = Number(ticker[String(key + "USD")])

        if (key == "USD") {
            usdPrice = 1
        }

        let usdValue = usdPrice * (available + onOrder)

        // Only add the currency to portfolio value if it is defined, not NaN
        if (usdValue) {
            totalCurrentValue = totalCurrentValue + usdValue
        }

        let current_balance = {
            currency: key,
            price: usdPrice,
            qty: available + onOrder,
            total_value: usdValue
        }

        balance_list.push(current_balance);
    }

    let portfolio_info = {
        balances: balance_list,
        total_value: totalCurrentValue
    }
    return portfolio_info;

}

module.exports = {
    get_portfolio
}
