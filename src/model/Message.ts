import mongoose, { Schema } from 'mongoose'

export interface MessageInterface {
	_id?: string
	creatorId: Schema.Types.ObjectId
}

const messageSchema = new Schema(
	{
		creatorId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		text: String,
	},
	{ timestamps: true }
)

export default mongoose.model('Message', messageSchema)
