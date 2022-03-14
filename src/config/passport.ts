
import { Strategy, ExtractJwt } from 'passport-jwt'
import User from '../model/User';

export default (passport: any) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET_TOKEN,
    }
    passport.use(
        new Strategy(options, (jwt_payload, done) => {
            User.findOne({ _id: jwt_payload.userId }, (err: Error, user: any) => {
                if (err) return done(err, false)
                if (user) return done(null, user)
                return done(null, false)
            })
        })
    )
    
}
