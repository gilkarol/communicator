import { Router } from 'express'
import { UserInterface } from '../model/User'
import UserService from '../service/AuthService'

const router = Router()

// SIGNUP NEW USER
router.post('/signup', async (req, res, next) => {
	try {
		const { body } = req as { body: UserInterface }
		await UserService.signup(body)
		return res.status(200).json({ message: 'User created successfully!' })
	} catch (err) {
		return next(err)
	}
})

// LOGIN USER
router.post('/login', async (req, res, next) => {
	try {
		const { body } = req as { body: UserInterface }
		const user: UserInterface = await UserService.login(body)
		const token: string = await UserService.getAuthenticationToken(user)
		return res.status(200).json({ user: user, token: token })
	} catch (err) {
		return next(err)
	}
})

// LOGOUT USER
router.post('/logout', async (req, res, next) => {
	try {
		return res.status(200).json({ token: null })
	} catch (err) {
		return next(err)
	}
})

export default router
