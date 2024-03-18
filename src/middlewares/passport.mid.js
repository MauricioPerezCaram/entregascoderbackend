import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { createHash, verifyHash } from "../utils/hash.utils.js";
import { users } from "../data/mongo/manager.mongo.js";
import { createToken } from "../utils/token.utils.js";

const { GOOGLE_ID, GOOGLE_CLIENT, SECRET } = process.env;

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        let one = await users.readByEmail(email);
        if (!one) {
          let data = req.body;
          data.password = createHash(password);
          let user = await users.create(data);
          return done(null, user);
        } else {
          return done(null, false, {
            message: "El usuario ya existe",
            statusCode: 400,
          });
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const user = await users.readByEmail(email);
        if (user) {
          const verify = verifyHash(password, user.password);
          if (verify) {
            // req.session.email = email;
            // req.session.role = user.role;
            const token = createToken({ email, role: user.role });
            req.token = token;
            return done(null, user);
          } else {
            return done(null, false, {
              message: "Bad auth de passport callback",
            });
          }
        } else {
          return done(null, false);
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

// passport.use(
//   "google",
//   new GoogleStrategy(
//     {
//       passReqToCallback: true,
//       clientID: GOOGLE_ID,
//       clientSecret: GOOGLE_CLIENT,
//       callbackURL: "http://localhost:8080/api/sessions/google/callback",
//     },
//     async (req, accessToken, refreshToken, profile, done) => {
//       try {
//         console.log(profile);
//         let user = await users.readByEmail(profile.id);
//         if (user) {
//           req.session.email = user.email;
//           req.session.role = user.role;
//           return done(null, user);
//         } else {
//           user = {
//             email: profile.id,
//           };
//           user = await users.create(user);
//           req.session.email = user.email;
//           req.session.role = user.role;
//           return done(null, user);
//         }
//       } catch (error) {
//         return done(error);
//       }
//     }
//   )
// );

passport.use(
  "jwt",
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.cookies["token"],
      ]),
      secretOrKey: SECRET,
    },
    async (payload, done) => {
      try {
        const user = await users.readByEmail(payload.email);
        if (user) {
          user.password = null;
          return done(null, user);
        } else {
          return done(null, false, info);
        }
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
