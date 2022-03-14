import User, { UserInterface } from '../model/User'
import { HttpError } from '../util/classes'
import ChatService from './ChatService';

export default class UserService {
	static getUsers = async (): Promise<UserInterface[]> => {
		const users = await User.find()
		return users
	}

	static getUser = async (userId: string) => {
		const user = await User.findById(userId)
		if (!user) {
			throw new HttpError(404, 'This user does not exist!')
		}
		return user
	}

    static addChatToUser = async (userId: string, chatId: string): Promise<UserInterface> => {
        const user = await this.getUser(userId)
        const chat = await ChatService.getChatById(chatId)
        
        user.chats.push(chat)
        await user.save()
        return user
    }
}
