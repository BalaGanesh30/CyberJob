import jwt from "jsonwebtoken";

// Function to generate a token
export const generateToken = (data) => {
  return jwt.sign({ id: data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Middleware to authenticate token from headers
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "Not Authorized. No token provided." });
  }

  const token = authHeader.split(" ")[1]; // Extract token after 'Bearer'

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id; // Attach user ID to the request object
    next(); // Continue to next middleware or route
  } catch (error) {
    console.error("JWT Authentication Error:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token." });
  }
};
