import jwt from "jsonwebtoken";

const generateTokenAndRedirect = (req, res) => {
  const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "none",
    secure: true,
    maxAge: 3600000,
  });
  res.redirect(process.env.CLIENT_URL + "/");
};

export default generateTokenAndRedirect;
