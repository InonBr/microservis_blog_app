const express = require("express");
const moderationRouter = require("./routers/moderationRouters");

const app = express();
const port = 5003;

app.use(express.json());

app.use("/api", moderationRouter);

app.listen(port, () => {
  console.log(`🟢 app listening on port http://localhost:${port}`);
});
