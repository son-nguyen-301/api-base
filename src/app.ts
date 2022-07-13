import express from "express";
import cors, {CorsOptions} from "cors";
import * as functions from "firebase-functions";
import {v4 as uuidv4} from "uuid";

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

exports.app = functions.region("europe-west3").https.onRequest(app);
