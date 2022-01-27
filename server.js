const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRouter')
require('dotenv/config')

const app = express()

var corOption = {
    origin: 'https://localhost:3000'
}


// middlware

app.use(cors(corOption))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))


// routers
app.use('/api/user', userRouter)

// Undefined routes

app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'route not found' });
});

// port

const port = process.env.PORT || 5000;

// server

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})