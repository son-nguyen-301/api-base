import {Router} from "express";

const exampleApi = Router();

exampleApi.get("/", (_, res) => {
  res.end("Hello World!");
});

export default exampleApi;
