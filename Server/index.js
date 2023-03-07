const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const mongoose = require("mongoose")
const Task = require('./models')


const router = express.Router()

dotenv.config()




app.use(express.json())

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.raw())
app.use(bodyParser.json())
app.use(cors(
    {
        origin: '*'
    }
))

mongoose.connect(process.env.Mongo).then(() => {
    console.log("connected")
})

app.get('/getProducts', async (req, reply) => {
    console.log('get items');
    try {
        const data = await Task.find()
        reply.status(200).send({ data: data })
    } catch (err) {
        reply.status(500).send(err.toString())
    }
})

app.post('/newProduct', async (req, reply) => {
    console.log('get items');
    try {

        const jsonBody = {
            Product_Code: req.body.Product_Code,
            Product_title: req.body.Product_title,
            Description: req.body.Description,
            Price: req.body.Price,
            Quantity: req.body.Quantity,
        }

        const Product = new Task(jsonBody)
        Product.save()


        reply.status(200).send('created product')
    } catch (err) {
        reply.status(500).send(err.toString())
    }
})


app.post('/updateProduct', async (req, reply) => {
    console.log('patch')
    try {
        const jsonBody = {
            Product_Code: req.body.Product_Code,
            Product_title: req.body.Product_title,
            Description: req.body.Description,
            Price: req.body.Price,
            Quantity: req.body.Quantity,
        }

        await Task.updateMany({ _id: req.body._id }, jsonBody)
        reply.status(200).send('Updated SucessFully....!')
    } catch (err) {
        reply.status(500).send(err.toString())
    }
})

app.post("/ProductDelete", async (req, reply) => {

    await Task.deleteOne({ _id: req.body._id })
    reply.status(200).send("Deleted Successfully")

})



app.listen(process.env.PORT, (err) => {
    if (err) {
        console.log('Server is not connected')
    }
    else {
        console.log('Server connected to port: ' + process.env.PORT)
    }

})