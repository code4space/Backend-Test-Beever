const { Quote } = require("../models");
const axios = require("axios");

class QuoteCollection {
  static async quoteFromKanye(req, res, next) {
    try {
      const { data } = await axios({
        url: "https://api.kanye.rest/",
        method: "GET",
      });
      await Quote.findOrCreate({
        where: {
          quote: data.quote,
        },
        defaults: {
          favorite: false,
          UserId: +req.user.id,
        },
      });
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async allQuote(req, res, next) {
    try {
      let quotesById = await Quote.findAll({
        where: {
          UserId: +req.user.id,
        },
      });
      let favoritesById = await Quote.findAll({
        where: {
          UserId: +req.user.id,
          favorite: true,
        },
      });
      let quotes = quotesById.map((el) => {
        return el.quote;
      });
      let favorites = favoritesById.map((el) => {
        return el.quote;
      });
      res.status(200).json({ quotes, favorites });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async addMyOwnQuote(req, res, next) {
    try {
      const { quote } = req.body;
      let input = { quote, UserId: +req.user.id, favorite: false };
      await Quote.create(input);
      res.status(201).json({ quote });
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
  static async setToFavorite(req, res, next) {
    try {
      const { id } = req.params;
      let quote = await Quote.findOne({ where: { id } });
      if (quote.favorite) {
        await Quote.update(
          { favorite: false },
          {
            where: { id },
          }
        );
        return res.status(202).json({ message: "success delete from favorite" });
      } else {
        await Quote.update(
          { favorite: true },
          {
            where: { id },
          }
        );
        return res.status(202).json({ message: "success add to favorite" });
      }
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
  static async deleteQuote(req, res, next) {
    try {
      const { id } = req.params;
      await Quote.destroy({where: {id}})
      res.status(202).json({ message: "success delete quote with id: " + id });
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
}

module.exports = QuoteCollection;
