import { Router } from 'express'
import { isAuth } from '../middleware/isAuth'
import { UserInterface } from '../model/User'
import UserService from '../service/UserService'

const router = Router()

// GET ALL USERS
router.get('/users', isAuth, async (req, res, next) => {
	const users: UserInterface[] = await UserService.getUsers()
	res.status(200).json({ users: users })
})

export default router
