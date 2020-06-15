const express = require('express')
const btc_client = require('../btc_client')
const router = express.Router()
// const PortfolioValueModel = require('./')

router.get('/balance', async (request, response) => {
    const balance_info = await btc_client.get_portfolio()
    response.contentType('application/json')
    response.end(JSON.stringify(balance_info))
})

module.exports = {
    router
}

