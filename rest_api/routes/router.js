const QuoteCollection = require("../controllers/quote");
const Customer = require("../controllers/user");
const { verifyToken } = require("../helper/jwt");
const {User} = require('../models')

const route = require("express").Router();

route.post("/login", Customer.login);
route.post("/register", Customer.register);

async function validation(req, res, next) {
  try {
    let accessToken = req.headers.access_token;
    if (!accessToken) {
      return res.status(401).json({ message: "Invalid token" });
    }
    let payload = verifyToken(accessToken);
    const user = await User.findOne({
      where: {
        id: +payload.id,
      },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid token" });
    }

    req.user = { id: user.id };
    next();
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal Server Error" });
  }
}

route.use(validation)
route.get('/quote', QuoteCollection.quoteFromKanye)
route.get('/quotes', QuoteCollection.allQuote)
route.post('/quote', QuoteCollection.addMyOwnQuote)
route.patch('/quote/:id', QuoteCollection.setToFavorite)
route.delete('/quote/:id', QuoteCollection.deleteQuote)

module.exports = route;
