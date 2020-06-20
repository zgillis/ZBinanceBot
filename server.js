const general_router = require('./routers/general_router')
const dbmgr = require('./database/db_manager')

const express = require('express')
const app = express()
const SERVER_PORT = 3000

app.use('/api', general_router.router)

app.get('/', (req, res) => {
    res.contentType('text/html')
    res.end("<h1>Hello!</h1><p>Welcome.</p>")
})

app.listen(SERVER_PORT, (err) => {
    if (err) {
        console.error(`There was an error while trying to listen on port ${SERVER_PORT}: ${err.message}`)
        process.exit(5)
    }

    console.log(`Listening on port ${SERVER_PORT}`)
})
