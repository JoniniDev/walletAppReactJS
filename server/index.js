import express from "express";
import cors from 'cors'
import transaction from './routes/getTransaction.js'

// init
const app = express()

// middleware
app.use(cors())
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json())
app.use('/api/transaction', transaction)

async function start() {
    try {
        app.listen(3001, () => console.log("Server started!"))
        console.log(app.all)
    } catch (error) {
        console.log(error)
    }
}

start()