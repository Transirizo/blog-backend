const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (req, res) => {
	const { username, name, password } = req.body;
	const existUser = await User.findOne({ username });

	if (existUser) {
		return res.status(400).json({
			error: "username must be exist",
		});
	}
	if (username.length < 3 || password.length < 3) {
		return res.status(400).json({
			error: "username or password invalid",
		});
	}
	const saltRounds = 10;
	const passwordHash = await bcrypt.hash(password, saltRounds);

	const newUser = new User({
		username,
		name,
		passwordHash,
	});

	const savedUser = await newUser.save();

	res.status(201).json(savedUser);
});

usersRouter.get("/", async (req, res) => {
	const users = await User.find({}).populate("blogs", {
		title: 1,
		url: 1,
		author: 1,
	});
	res.json(users);
});

module.exports = usersRouter;
