const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const loginRouter = require("express").Router();

loginRouter.post("/", async (req, res) => {
	const { username, password } = req.body;
	const user = await User.findOne({ username });
	const checkPassword =
		user === null ? false : await bcrypt.compare(password, user.passwordHash);

	if (!(user && checkPassword)) {
		return res.status(401).json({
			error: "invalid username or password",
		});
	}

	const userToken = {
		username: user.username,
		id: user._id,
	};

	const token = jwt.sign(userToken, process.env.SECRET, { expiresIn: 60 * 60 });

	res.status(200).send({ token, username: user.username, name: user.name });
});

module.exports = loginRouter;
