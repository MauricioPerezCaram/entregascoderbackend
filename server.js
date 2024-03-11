import env from "./src/utils/env.util.js";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";
import socketUtils from "./src/utils/socket.utils.js";
import dbConnection from "./src/utils/db.js";
import expressSesion from "express-session";
import sessionFileStore from "session-file-store";
import args from "./src/utils/args.util.js";

console.log(env);
import MongoStore from "connect-mongo";

import IndexRouter from "./src/routers/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";
import pathHandler from "./src/middlewares/pathHandler.mid.js";
import __dirname from "./utils.js";
import cookieParser from "cookie-parser";

const server = express();
const PORT = env.PORT || 8080;
const ready = () => {
  console.log("server ready on port " + PORT);
  dbConnection();
};
const httpServer = createServer(server);
const socketServer = new Server(httpServer);
httpServer.listen(PORT, ready);
socketServer.on("connection", socketUtils);

const FileStore = sessionFileStore(expressSesion);

//templates
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

//middlewares
server.use(cookieParser(env.SECRET_KEY));

// MEMORY STORE
// server.use(
//   expressSesion({
//     secret: "env.SECRET_SESSION",
//     resave: true,
//     saveUninitialized: true,
//     cookie: { maxAge: 6000 },
//   })
// );

// FILE STORE
// server.use(
//   expressSesion({
//     secret: "env.SECRET_SESSION",
//     resave: true,
//     saveUninitialized: true,
//     store: new FileStore({
//       path: "./src/data/fs/files/sessions",
//       ttl: 10,
//       retries: 2,
//     }),
//   })
// );

// MONGO STORE
server.use(
  expressSesion({
    secret: env.SECRET_KEY,
    resave: true,
    saveUninitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: env.DB_LINK,
    }),
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public"));
server.use(morgan("dev"));

//endpoints
const router = new IndexRouter();
server.use("/", router.getRouter());
server.use(errorHandler);
server.use(pathHandler);

export { socketServer };

console.log(args);
