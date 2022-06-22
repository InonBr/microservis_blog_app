const express = require("express");
const cors = require("cors");
const postsRouter = require("./routers/postsRouters");

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/posts", postsRouter);

app.listen(port, () => {
  console.log("vLatest");
  console.log(`🟢 app listening on port http://localhost:${port}`);
});
