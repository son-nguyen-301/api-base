import express from "express";
import cors, {CorsOptions} from "cors";
import * as functions from "firebase-functions";
import {v4 as uuidv4} from "uuid";
import exampleApi from "./api/exampleApi";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      requestId: string;
    }
  }
}

const app = express();
const corsOptions: CorsOptions = {
  origin: "*",
};

app.use(cors(corsOptions));
app.use((req, _, next) => {
  req.requestId = uuidv4();
  next();
});
app.use(express.json());
app.use("/example", exampleApi);

exports.app = functions
  .region("europe-west3")
  .runWith({minInstances: 1})
  .https.onRequest(app);
