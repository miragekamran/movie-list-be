const express = require('express')
const server = require('./api/server')
const cors = require("cors");
const helmet = require("helmet");


// const server = express()

server.use(express.json())
server.use(cors());
server.use(helmet());


server.get('/hello', (req, res) => {
    res.json('hello, there')
})

const port = process.env.PORT || 9000

server.listen(port, () => {
    console.log(`listening on port ${port}`)
})