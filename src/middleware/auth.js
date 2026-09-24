// TODO: Team - Implement JWT auth middleware before Saturday 26th Sept 2026
// Steps:
// 1. Get token from Authorization header
// 2. Verify with jwt.verify(token, process.env.JWT_SECRET)
// 3. Add decoded user to req.user and call next()

const auth = (req, res, next) => {
  // Team will fill this logic
  next();
};

module.exports = auth;