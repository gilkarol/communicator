import mongoose, { Schema } from 'mongoose'

export interface UserInterface {
    id?: string,
	email?: string
	password: string
	nickname: string
}

const userSchema = new Schema({
	email: String,
	password: String,
	nickname: String,
})

export default mongoose.model('User', userSchema)
