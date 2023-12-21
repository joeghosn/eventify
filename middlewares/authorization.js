const jwt = require('jsonwebtoken');

const authorization = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // Extract the bearer token from the request headers
      const token = req.cookies.token

      // Check if a token is provided
      if (!token) {
          return res.render('../views/pages/unauthorized');
      }

      // Verify the token
      jwt.verify(token, process.env.JWT_SECRET_KEY , async (err, decoded) => {
        if (err) {
          return res.render('../views/pages/unauthorized');
        }

        // The decoded object contains the user information, including the role
        const userRole = decoded.role;
        const userId= decoded.userId;

        // Check if the user's role is allowed
        if (!allowedRoles.includes(userRole)) {
          return res.render('../views/pages/unauthorized')
   
        }

        //Attach user Id and role to the req object
        req.user={
            userId,
            userRole,
        }
        // If the user's role is allowed, proceed to the next middleware or route handler
        next();
      });
    } catch (error) {
      console.log(error.message)
      res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
      });
    }
  };
};

module.exports = authorization;
