import app from "./config/expressConfig.js";
import { connectDb } from "./config/db.js";
import constants from "./utils/constants.js";

const PORT = process.env.PORT || 3000;

function startServer() {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

// connecting db
connectDb(constants.MONGO_URI)
  .then(() => {
    console.info("data connection established succesfull");
    startServer();
  })
  .catch((err) => {
    console.warn("database not connected", err?.message);
    return;
});
