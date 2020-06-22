const {Sequelize} = require('sequelize')
const PortfolioHistoryModel = require('./portfolio_history')
const btc_client = require('../btc_client')
const sequelize = new Sequelize("mysql://zgillis:laptop10@localhost:4406/zbinancebot");

sequelize.authenticate().then(() => {
    console.log("Connection was successful.")
}).catch((error => {
    console.error(error.message)
}));


const PortfolioHistory = PortfolioHistoryModel(sequelize, Sequelize)

sequelize.sync({force: false}).then(() => {
    console.log("Database and tables created successfully.")
    setInterval(() => {
        btc_client.get_portfolio().then((balance_info) => {
            PortfolioHistory.create({
                date: Date.now(),
                balances: balance_info.balances,
                totalValue: balance_info.total_value
            })
            
        })
    }, 300000)
})


module.exports = {
    sequelize,
    PortfolioHistory
}