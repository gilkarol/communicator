import { Router } from 'express'
import { isAuth } from '../middleware/isAuth'
import { ChatInterface } from '../model/Chat'
import ChatService from '../service/ChatService'
import MessageService from '../service/MessageService'
import { CustomRequest } from '../util/interfaces'

const router = Router()

// GET ALL CHATS
router.get('/chats', isAuth, async (req, res, next) => {
	try {
		const { userId } = req as CustomRequest
		const chats: ChatInterface[] = await ChatService.getChats(userId as string)
		res.status(200).json({ chats: chats })
	} catch (err) {
		return next(err)
	}
})

// GET CHAT BY ANOTHER USER NICKNAME
router.get('/:anotherUserNickname', isAuth, async (req, res, next) => {
	try {
		const { userId } = req as CustomRequest
		const { anotherUserNickname } = req.params
		const chat: ChatInterface = await ChatService.getChatByNickname(userId!, anotherUserNickname)
		res.status(200).json({ chat: chat })
	} catch (err) {
		return next(err)
	}
})

// CREATE CHAT WITH ANOTHER USER BY HIS ID
router.post('/create/:anotherUserId', isAuth, async (req, res, next) => {
	try {
		const { anotherUserId } = req.params
		const { userId } = req as CustomRequest
		const chat = await ChatService.createChat(userId!, anotherUserId)
		res.status(201).json({message: 'Chat created successfully!', chat: chat})
	} catch (err) {
		next(err)
	}
})

// SEND MESSAGE TO CHAT
router.post('/sendMessage/:chatId', isAuth, async (req, res, next) => {
	try {
		const { userId } = req as CustomRequest
		const { chatId } = req.params
		const { text } = req.body
		const message = await MessageService.createMessage(userId!, text)
		const chat = await ChatService.sendMessageToChat(chatId, message)
		res.status(200).json({chat: chat})
	} catch (err) {
		next(err)
	}
})

export default router
