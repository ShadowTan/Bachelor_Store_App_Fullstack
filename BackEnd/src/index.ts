//Main file for the back-end of the site

//Node imports
import path from "path";

//Module Imports
import express, { Express, Request, Response } from "express";
import cors from "cors";

//file imports
import * as vare from "./vare";

const port: number = Number(process.env.PORT) || 3000;
const app: Express = express();
app.use("/", express.static(path.join(__dirname, "./dist")));
app.listen(port, () => {
  console.log("Loan server is up");
});
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.get("/v1/vare/oftebrukt", async (req: Request, res: Response) => {
  const vareWorker = new vare.Worker();
  res.send(await vareWorker.fetchCommonlySearchedItems());
});

app.get("/v1/vare/search/:input", async (req: Request, res: Response) => {
  const vareWorker = new vare.Worker();
  res.send(await vareWorker.fetchItems(req.params.input));
});

app.get("/v1/vare/bilde/:varenummer", async (req: Request, res: Response) => {
  const vareWorker = new vare.Worker();
  res.send(await vareWorker.getItemMapImage(req.params.varenummer));
  // res.send(req.params.varenummer);
});

app.get("/v1/vare/alle", async (req: Request, res: Response) => {
  const vareWorker = new vare.Worker();
  res.send(await vareWorker.fetchAllItems());
});
