const {Sequelize} = require('sequelize')
const PortfolioHistoryModel = require('./portfolio_history')

const sqlize = new Sequelize("mariadb://zgillis:laptop10@localhost:4406/zbinancebot");

sqlize.authenticate().then(() => {
    console.log("Connection was successful.")
}).catch((error => {
    console.error(error.message)
}));


const PortfolioHistory = PortfolioHistoryModel(sqlize, Sequelize)

sqlize.sync({force: true}).then(() => {
    console.log("Database and tables created successfully.")
})


module.exports = {
    sqlize
}