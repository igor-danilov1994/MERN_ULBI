import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import fileupload from 'express-fileupload'
import authRouter from './routes/auth.js'
import fileRouter from "./routes/file.js"

const app = express()
const PORT = process.env.PORT
const DB_NAME = process.env.DB_NAME
const DB_PASS = process.env.DB_PASS

app.use(express.json())
dotenv.config()
app.use(fileupload({}))
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/files', fileRouter)

const DB_URL = `mongodb+srv://igordanilov1824:test@cluster0.nzgd0mj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`

const start = async () => {
    try {
        await mongoose.connect(DB_URL)

        app.listen(5001, () => {
            console.log(`server run 5001`)
        })
    } catch (e) {
        console.log('mongoose not connect!')
        console.log(e)
        process.exit(1)
    }
}

start()
