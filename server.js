const Binance = require('node-binance-us-api')

const binance = Binance().options({
    APIKEY: process.env.API_KEY,
    APISECRET: process.env.PRIVATE_KEY
});


async function main() {
    let ticker = await binance.prices()
    let totalCurrentValue = 0

    binance.balance((err, balances) => {

        if (err) {
            console.error(err)
            process.exit(5)
        }

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
            console.log(`${key} Balance:\t${available + onOrder}\t1 ${key} = $${usdPrice}\t\tUSD Value: ${usdValue}`)
        }

        console.log('-------------------------------------------------------');
        console.log(`Total Portfolio Value = ${totalCurrentValue}`)
    })
}

main();
