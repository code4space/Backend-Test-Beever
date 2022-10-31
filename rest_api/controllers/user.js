const { User } = require("../models");
const { matchPassword } = require("../helper/brypt");
const { getToken } = require("../helper/jwt");

class Profile {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      if (!password) {
        return res.status(400).json({ message: "Password is required" });
      }
      const user = await User.findOne({
        where: { email },
      });
      if (!user) {
        return res.status(401).json({ message: "Invalid email/password" });
      }
      const isTrue = matchPassword(password, user.password);
      if (!isTrue) {
        return res.status(401).json({ message: "Invalid email/password" });
      }
      const payload = {
        id: user.id,
      };
      const access_token = getToken(payload);
      res.status(200).json({ access_token });
    } catch (error) {
      if (
        error.name == "SequelizeUniqueConstraintError" ||
        error.name == "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      const input = {
        email,
        password,
      };
      const register = await User.create(input);
      res.status(201).json({ id: `${register.id}`, email:`${register.email}` });
    } catch (error) {
      if (
        error.name == "SequelizeUniqueConstraintError" ||
        error.name == "SequelizeValidationError"
      ) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      next(error);
    }
  }
}

module.exports = Profile;
