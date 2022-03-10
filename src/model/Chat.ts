import mongoose, { Schema } from 'mongoose'
import { MessageInterface } from './Message';
import { UserInterface } from './User';

export interface ChatInterface {
    _id?: string,
    participants: UserInterface[],
    messages: MessageInterface[]
}

const chatSchema = new Schema({
    participants: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message'
    }]
})

export default mongoose.model('Chat', chatSchema)
