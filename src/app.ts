import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { json } from 'body-parser'
import authRoutes from './route/Auth'
import chatRoutes from './route/Chat'
import userRoutes from './route/User'
import passport from 'passport'
import passportConfig from './config/passport'
dotenv.config({ path: './.env' })

const app = express()

app.use(json())
passportConfig(passport)
app.use(passport.initialize())
app.use('/auth', authRoutes)
app.use('/chat', chatRoutes)
app.use('/user', userRoutes)

mongoose
	.connect(process.env.DATABASE as string)
	.then((result) => {
		app.listen(8080)
	})
	.catch((err) => {
		console.log(err)
	})
