const { db, Member, Dues, syncAndSeed } = require("./db");
const express = require("express");
const app = express();
const path = require("path");

app.get("/members", async (req, res, next) => {
  try {
    const members = await Member.findAll({
      include: Dues,
    });
    res.send(members);
  } catch (err) {
    next(err);
  }
});
app.get("/members/:memberId", async (req, res, next) => {
  try {
    const member = await Member.findByPk(req.params.memberId);
    res.send(member);
  } catch (err) {
    next(err);
  }
});

const init = async () => {
  try {
    await db.sync({ force: true });
    await syncAndSeed();
  } catch (err) {
    console.log(err);
  }
};

init();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}`));
