const express = require("express");
const cors = require("cors");
const queryRouter = require("./routers/queryRouter");

const app = express();
const port = 5002;

app.use(cors());
app.use(express.json());

app.use("/api/query", queryRouter);

app.listen(port, () => {
  console.log(`🟢 app listening on port http://localhost:${port}`);
});
