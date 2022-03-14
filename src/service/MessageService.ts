import Message, { MessageInterface } from '../model/Message'

export default class MessageService {
	static createMessage = async (
		creatorId: string,
		text: string
	): Promise<MessageInterface> => {
		const message = new Message({ creatorId: creatorId, text: text })
		await message.save()
		return message
	}
}
