const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res, next) => {
      res.redirect("/survey");
    }
  );

  app.get("/api/current_user", (req, res) => {
    if (req.user === undefined) {
      return res.send({});
    }

    res.send(req.user);
  });

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.send({});
  });
};
