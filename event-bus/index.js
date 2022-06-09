const express = require("express");
const cors = require("cors");
const eventsRouter = require("./routers/eventsRouters");

const app = express();
const port = 5005;

app.use(cors());
app.use(express.json());

app.use("/api", eventsRouter);

app.listen(port, () => {
  console.log(`🟢 app listening on port http://localhost:${port}`);
});
