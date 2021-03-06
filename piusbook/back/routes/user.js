const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const passport = require("passport");
const { User, Post, Image, Comment } = require("../models");
const db = require("../models");
const { Op } = require("sequelize");
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");

// login
router.post("/login", isNotLoggedIn, (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.message);
    }
    req.login(user, async (err) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      // join 해서 만들어준 모델
      const userWithoutPassword = await User.findOne({
        where: {
          id: user.id,
        },
        // attribute: ['id','email','nickname'],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: db.Post,
          },
          {
            model: db.User,
            as: "Followings",
          },
          {
            model: db.User,
            as: "Followers",
          },
        ],
      });
      return res.status(200).json(userWithoutPassword);
    });
  })(req, res, next);
});

// logout
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.logOut();
  req.session.destroy();
  res.send("log out success");
});
// GET /user  내 정보 불러오기
router.get("/", async (req, res, next) => {
  try {
    console.log(req.cookies);
    if (req.user) {
      const userWithoutPassword = await User.findOne({
        where: {
          id: req.user.id,
        },
        // attribute: ['id','email','nickname'],
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(userWithoutPassword);
    } else {
      res.status(200).json(null);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// POST /user 회원가입
router.post("/", isNotLoggedIn, async (req, res, next) => {
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (exUser) {
      return res.status(403).send("already registered");
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });
    res.status(200).json();
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// 닉네임 수정
router.patch("/edit/nickname", isLoggedIn, async (req, res, next) => {
  try {
    await User.update(
      {
        nickname: req.body.nickname,
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    res.json({ nickname: req.body.nickname });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 팔로우
router.patch("/:userId/follow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.userId,
      },
    });
    if (!user) {
      return res.status(403).send("존재하지 않는 회원입니다.");
    }
    user.addFollower(req.user.id);
    return res.json({
      FollowingId: parseInt(req.params.userId),
      FollowerId: req.user.id,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// 언팔로우
router.patch("/:userId/unfollow", isLoggedIn, async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      return res.status(403).send("존재하지 않는 회원입니다.");
    }
    await user.removeFollowing(req.params.userId);
    return res.json({
      FollowingId: parseInt(req.params.userId),
      FollowerId: req.user.id,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// 팔로잉 목록
router.get("/followings", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    const followings = await user.getFollowings({
      limit: parseInt(req.query.limit),
    });
    res.json(followings);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// 팔로워 목록
router.get("/followers", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    const followers = await user.getFollowers({
      limit: parseInt(req.query.limit),
    });
    res.json(followers);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
// 팔로워 삭제
router.delete("/follower/:userId", async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.user.id,
      },
    });
    if (!user) {
      res.status(403).send("존재하지 않는 회원입니다.");
    } else {
      await user.removeFollower(req.params.userId);
      res.json({ UserId: parseInt(req.params.userId) });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  // GET /user/3
  try {
    const fullUserWithoutPassword = await User.findOne({
      where: { id: req.params.id },
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Post,
          attributes: ["id"],
        },
        {
          model: User,
          as: "Followings",
          attributes: ["id"],
        },
        {
          model: User,
          as: "Followers",
          attributes: ["id"],
        },
      ],
    });
    if (fullUserWithoutPassword) {
      const data = fullUserWithoutPassword.toJSON();
      data.Posts = data.Posts.length;
      data.Followings = data.Followings.length;
      data.Followers = data.Followers.length;
      res.status(200).json(data);
    } else {
      res.status(404).json("존재하지 않는 사용자입니다.");
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
// 한 사용자의 게시글 가져오기
router.get("/:userId/posts", async (req, res, next) => {
  try {
    const where = { UserId: parseInt(req.params.userId) };
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
          model: User,
          attributes: {
            exclude: ["password"],
          },
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
