const app = require("./app");
const connectDB = require("./config/db");
const { PORT } = require("./secret");


app.get("/", (req, res) => res.send("Hello World!"));
app.listen(PORT, async () => {
  console.log(`Example app listening on port ${PORT}!`);
  await connectDB();
});
