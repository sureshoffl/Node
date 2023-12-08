const express = require("express");

function socketRouter(io) {
  const router = express.Router();

  router.get("/socket", (req, res) => {
    const count = req.query.count;
    if (!count) {
      res.json({
        message: "data not found",
      });
    }
    io.emit("mod_socket", count);
    res.json({
      message: "successful delivered",
    });
  });

  return router
}

module.exports = socketRouter;
