const {Sequelize} = require('sequelize')
const PortfolioHistoryModel = require('./portfolio_history')

const sequelize = new Sequelize("mysql://zgillis:laptop10@localhost:4406/zbinancebot");

sequelize.authenticate().then(() => {
    console.log("Connection was successful.")
}).catch((error => {
    console.error(error.message)
}));


const PortfolioHistory = PortfolioHistoryModel(sequelize, Sequelize)

sequelize.sync({force: true}).then(() => {
    console.log("Database and tables created successfully.")
})


module.exports = {
    sequelize
}