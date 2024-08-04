// const jwt = require("jsonwebtoken");

// const { HttpError } = require("../helpers");

// const { User } = require("../models/users");

// const { SECRET_KEY } = process.env;

// const authenticate = async (req, res, next) => {
//   const { authorization = "" } = req.headers;

//   const [bearer, token] = authorization.split(" ");

//   if (bearer !== "Bearer") {
//     next(HttpError(401, "Not authorized"));
//   } else {
//     try {
//       const { id } = jwt.verify(token, SECRET_KEY);

//       const user = await User.findById(id);

//       if (!user || !user.token) {
//         next(HttpError(401, "Not authorized"));
//       }
//       req.user = user;
//       next();
//     } catch (error) {
//       next(HttpError(401, error.message));
//     }
//   }
// };

// module.exports = authenticate;