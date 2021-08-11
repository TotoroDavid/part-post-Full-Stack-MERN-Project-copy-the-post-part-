import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'
//routes
import postRoutes from './routes/posts.js'

const app = express()
dotenv.config()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())

//middleware
app.use('/posts', postRoutes)

app.get('/', (req, res) => {
    res.send('hello to memories API')
})

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.CONNECTION_URL, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => app.listen(PORT, () => console.log(`Server running on port:${PORT}`)))
    .catch((error) => console.log(error.message))

mongoose.set('useFindAndModify', false)