const express = require("express");
const cors = require("cors");
const commentsRouters = require("./routers/commentsRouters");

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

app.use("/api", commentsRouters);

app.listen(port, () => {
  console.log(`🟢 app listening on port http://localhost:${port}`);
});
