const express = require("express");
const { Post, Hashtag, Image, Comment, User } = require("../models");
const { Op } = require("sequelize");
const router = express.Router();

router.get("/:hashtag", async (req, res, next) => {
  try {
    const where = {};
    if (parseInt(req.query.lastId)) {
      where.id = {
        [Op.lt]: parseInt(req.query.lastId),
      };
    }
    const posts = await Post.findAll({
      where,
      limit: 10,
      order: [
        ["createdAt", "DESC"],
        [Comment, "createdAt", "DESC"],
      ],
      include: [
        {
          model: Hashtag,
          where: {
            name: decodeURIComponent(req.params.hashtag),
          },
        },
        {
          model: User,
          attributes: ["id", "nickname"],
        },
        {
          model: Image,
        },
        {
          model: Comment,
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
          ],
        },
        {
          model: User, // 좋아요 누른 User
          as: "Likers",
          attributes: ["id"],
        },
        {
          model: Post,
          as: "Retweet",
          include: [
            {
              model: User,
              attributes: ["id", "nickname"],
            },
            {
              model: Image,
            },
          ],
        },
      ],
    });
    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

module.exports = router;
