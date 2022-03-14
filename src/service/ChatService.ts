import Chat, { ChatInterface } from '../model/Chat'
import { MessageInterface } from '../model/Message';
import User from '../model/User'
import { HttpError } from '../util/classes'
import UserService from './UserService';

export default class ChatService {
	static getChats = async (userId: string): Promise<ChatInterface[]> => {
		const user = await UserService.getUser(userId)
		const chats = user.chats
		return chats
	}

	static getChatByNickname = async (userId: string, anotherUserId: string) => {
		const chat = await Chat.findOne({where: {participants: [userId, anotherUserId]}})
		if (!chat) {
			throw new HttpError(404, 'Chat does not exist!')
		}
		return chat
	}

	static getChatById = async (chatId: string) => {
		const chat = await Chat.findById(chatId)
		if (!chat) {
			throw new HttpError(404, 'Chat does not exist!')
		}
		return chat
	}

	static createChat = async (
		userId: string,
		anotherUserId: string
	): Promise<ChatInterface> => {
		const chat = await this.getChatByNickname(userId, anotherUserId)
		if (chat) return chat
		const newChat = new Chat({
			participants: [userId, anotherUserId],
		})
		await UserService.addChatToUser(userId, chat._id)
		await UserService.addChatToUser(anotherUserId, chat._id)
		await newChat.save()
		return newChat
	}

	static sendMessageToChat = async (chatId: string, message: MessageInterface) => {
		const chat = await this.getChatById(chatId)
		chat.messages.push(message)
		await chat.save()
		return chat
	}
}
