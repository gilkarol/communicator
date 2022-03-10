import mongoose, { Schema } from 'mongoose'
import { ChatInterface } from './Chat';

export interface UserInterface {
	_id?: string
	email?: string
	password?: string
	nickname: string
    chats: ChatInterface[]
}

const userSchema = new Schema({
	email: String,
	password: String,
	nickname: String,
    chats: [{
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    }]
})

export default mongoose.model('User', userSchema)
