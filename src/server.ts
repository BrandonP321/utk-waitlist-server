import dotenv from "dotenv";
import express, { Request } from "express";
import cors from "cors";
import helmet from "helmet";
import db, { connectToMongoDb } from "./dbConnection";

dotenv.config();

import { createServer } from "http";

const PORT = process.env.PORT || "8000";

export const app = express();
const httpServer = createServer(app);

connectToMongoDb();

app.use(helmet());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/subscribe", async (req: Request<{}, {}, { email: string }>, res) => {
  try {
    const email = req.body.email.trim();
    console.log(email);

    const existingSub = await db.Subscriber.findOne({ email });
    console.log({ existingSub });

    if (existingSub) {
      return res.status(400).json({ error: "Already subscribed" }).end();
    }

    const sub = await db.Subscriber.create({ email });

    console.log(sub);

    return res.json({ message: "Subscribed successfully" }).end();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" }).end();
  }
});

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
