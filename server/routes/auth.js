const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/api/current_user", (req, res) => {
    console.log("aaaaaaaaaaaaaaaaaa", req.user);
    res.send({ user: req.user, message: "Hello" });
  });
};
