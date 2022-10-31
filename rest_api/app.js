require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000
const route = require('./routes/router')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(route)

app.listen(port, () => {
    console.log(`app running on port ${port}`)
})