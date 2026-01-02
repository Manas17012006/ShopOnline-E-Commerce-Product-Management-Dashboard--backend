const userauth = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token)
      return res.status(401).json({ success: false, message: "Please login to get started!" });

    // find user by token
    const user = await userModel.findOne({ token });
    if (!user)
      return res.status(401).json({ success: false, message: "Invalid token" });

    req.userId = user._id;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
};

module.exports = { userauth };
