import { NextFunction, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserInterface } from '../model/User'
import { CustomRequest } from '../util/interfaces'
import { HttpError } from '../util/classes'
import passport from 'passport';

// export const isAuth = (
// 	req: CustomRequest,
// 	res: Response,
// 	next: NextFunction
// ) => {
// 	try {
// 		const token: string = req.get('Authorization')!.split(' ')[1]
// 		if (!token) {
// 			throw new HttpError(401, 'Not authenticated!')
// 		}
// 		const unhashedToken: UserInterface = jwt.verify(
// 			token,
// 			process.env.JWT_SECRET_TOKEN as string
// 		) as UserInterface
// 		req.userId = unhashedToken._id
// 		next()
// 	} catch (err) {
// 		return next(err)
// 	}
// }

export const isAuth = passport.authenticate('jwt', { session: false })