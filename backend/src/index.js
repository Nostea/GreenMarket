import express from "express";
import morgan from "morgan";
import cors from "cors";
import { connectToDatabase } from "./models/index.js";
import cookieSession from "cookie-session";
import dotenv from "dotenv";
import { userRouter } from "./routes/userRouter.js";
import { productRouter } from "./routes/productRouter.js";
import { categoryRouter } from "./routes/categoryRouter.js";
import { cartRouter } from "./routes/cartRouter.js";
import { favoriteRouter } from "./routes/favoriteRoutes.js";
import { orderRouter } from "./routes/orderRouter.js";

// DEPLOY

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const path = require("path");
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();

// app.use(express.static("data/images")); // static file server

const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
const isFrontendLocalhost =
  process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

console.log(process.env.FRONTEND_URL);

// re-configure cors middleware
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));
/////////// add parser for cookies
app.set("trust proxy", 1); // trust first proxy
const cookieSessionOptions = {
  name: "session",
  secret: cookieSessionSecret, // frei wählbar
  httpOnly: true,
  expires: new Date(Date.now() + twoWeeksInMs),
  sameSite: isFrontendLocalhost ? "lax" : "none",
  secure: isFrontendLocalhost ? false : true,
};
app.use(cookieSession(cookieSessionOptions));
app.use(morgan("dev"));
app.use(express.json()); // body parser

app.use("/api/v1/users", userRouter);

app.use("/api/v1/products", productRouter);

app.use("/api/v1/categories", categoryRouter);

app.use("/api/v1/favorites", favoriteRouter);

app.use("/api/v1/cart", cartRouter);

app.use("/api/v1/order", orderRouter);

app.use("/api/v1/uploads", express.static("uploads"));

app.use((req, res, next) => {
  if (
    /(.ico|.js|.css|.jpg|.jpeg|.png|.svg|.map|.woff|.woff2)$/i.test(req.path)
  ) {
    next();
  } else {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    res.sendFile(path.join(__dirname, "../", "frontend", "index.html"));
  }
});

app.use(express.static("frontend"));

try {
  await connectToDatabase();
  const PORT = process.env.PORT || 3009;
  app.listen(PORT, () => console.log("Server listening at port", PORT));
} catch (err) {
  console.log(err);
  process.exit();
}
