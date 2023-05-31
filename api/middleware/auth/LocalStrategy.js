import { Strategy as LocalStrategy } from "passport-local";
import User from "../../models/User.js";

export default new LocalStrategy(
  { emailField: "email", passwordField: "password" },
  async (email, password, done) => {
    try {
      let user = await User.findOne({ email });
      if (!user) {
        await User.insertOne({ email });
        user = User.findOne({ email });
        console.log(user);
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);
