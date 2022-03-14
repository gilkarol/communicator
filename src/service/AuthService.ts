import User, { UserInterface } from '../model/User'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { HttpError } from '../util/classes'
import passport from 'passport'
import { Strategy, ExtractJwt } from 'passport-jwt'

export default class AuthService {
	static signup = async (body: UserInterface): Promise<UserInterface> => {
		const emailExists = await User.findOne({
			email: body.email,
		})
		console.log(emailExists)
		if (emailExists) {
			throw new HttpError(409, 'This email already exists!')
		}
		const nicknameExists = await User.findOne({
			nickname: body.nickname,
		})
		if (nicknameExists) {
			throw new HttpError(409, 'This nickname already exists!')
		}
		const hashedPassword = await bcryptjs.hash(body.password!, 10)
		const user = new User({
			email: body.email,
			password: hashedPassword,
			nickname: body.nickname,
			chats: [],
		})
		await user.save()
		return user
	}

	static login = async (body: UserInterface) => {
		const user = await User.findOne({ nickname: body.nickname })
		if (!user) {
			throw new HttpError(404, 'User with this nickname does not exist!')
		}
		const isPasswordEqual = await bcryptjs.compare(
			body.password as string,
			user.password
		)
		if (!isPasswordEqual) {
			throw new HttpError(409, 'Passwords does not match!')
		}
		const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET_TOKEN as string)
		return token
	}

	static getAuthenticationToken = async (
		user: UserInterface
	): Promise<string> => {
		const token = jwt.sign(user._id!, process.env.JWT_SECRET_TOKEN as string)
		return token
	}
}
