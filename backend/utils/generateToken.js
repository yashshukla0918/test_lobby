import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
        expiresIn: "15d",
    });
    res.cookie("jwt", token, {
        maxAge: 1000 * 60 * 60 * 24 * 15, //MilliSeconds * Seconds * Minutes * Hours * Days
        httpOnly: true, // Prevent XSS attack (Cross-site scripting attacks)
        sameSite: "strict", // Prevent CSRF attack (Cross-site request forgery)
        secure: process.env.NODE_ENV === "development" ? false : true // Only allow cookies to be sent over HTTPS
    });
};

export default generateTokenAndSetCookies;