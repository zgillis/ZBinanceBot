const {DataTypes, Model, Sequelize} = require('sequelize')

module.exports = (sequelize, type) => {
    return sequelize.define('portfolio_history', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        balances: {
            type: DataTypes.ARRAY(DataTypes.key)
        },
        totalValue: {
            type: DataTypes.FLOAT(11, 2)
        }
    });
}
