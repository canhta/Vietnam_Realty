// Authentication and Authorization Middleware
const ROLE = require("../constants/roleConstrants");
module.exports = {
  ADMIN: (req, res, next) => {
    //   if (req.session && req.session.user === "amy" && req.session.admin)
    if (req.session.user && req.session.role === ROLE.REQUIRE_MEMBER)
      return next();
    else return res.json("Error session admin");
  },
  MEMBER: (req, res, next) => {
    //   if (req.session && req.session.user === "amy" && req.session.admin)
    if (
      req.session.user &&
      (req.session.role === ROLE.REQUIRE_MEMBER ||
        req.session.role === ROLE.REQUIRE_ADMIN)
    )
      return next();
    else return res.json("Error session member");
  }
};
