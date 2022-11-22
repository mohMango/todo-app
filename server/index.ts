import { createServer } from "http";
import mongoose from "mongoose";

import { app } from "./app";
import { config } from "./src/config/config";

const server = createServer(app);

mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    server.listen(config.server.port, () => {
      console.log(`server run on PORT:${config.server.port}`);
    });
  })
  .catch((error) => {
    console.log({ error });
  });
