import { celebrate, Joi, Segments } from 'celebrate'
import { Router } from 'express'
import { UserInterface } from '../model/User'
import AuthService from '../service/AuthService'
import UserService from '../service/AuthService'

const router = Router()

// SIGNUP NEW USER
router.post(
	'/signup',
	celebrate({
		body: {
			nickname: Joi.string().min(3).required(),
			email: Joi.string().email().required(),
			password: Joi.string().min(5).required(),
		},
	}),
	async (req, res, next) => {
		try {
			const { body } = req as { body: UserInterface }
			await UserService.signup(body)
			return res.status(200).json({ message: 'User created successfully!' })
		} catch (err) {
			return next(err)
		}
	}
)

// LOGIN USER
router.post(
	'/login',
	celebrate({
		body: {
			nickname: Joi.string().min(3).required(),
			password: Joi.string().min(5).required(),
		},
	}),
	async (req, res, next) => {
		try {
			const { body } = req as { body: UserInterface }
			const user = await AuthService.login(body)
			return res.status(200).json({ user: user })
		} catch (err) {
			return next(err)
		}
	}
)

// LOGOUT USER
router.post('/logout', async (req, res, next) => {
	try {
		return res.status(200).json({ token: null })
	} catch (err) {
		return next(err)
	}
})

export default router
