import "reflect-metadata";
import dotenv from "dotenv";
dotenv.config();
import { buildSchema } from "type-graphql";
import { resolvers } from "./resolvers/index";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import mongoose from "mongoose";
import path from "path";

(async () => {
  // * Build the schema
  const schema = await buildSchema({
    resolvers,
  });

  // * Init express
  const app = express();
  const PORT = process.env.PORT || 5000;

  // * Init Apollo Server
  const server = new ApolloServer({
    schema,
    context: (ctx) => {
      return ctx;
    },

    plugins: [
      process.env.NODE_ENV === "production"
        ? ApolloServerPluginLandingPageProductionDefault
        : ApolloServerPluginLandingPageGraphQLPlayground,
    ],
    cache: "bounded",
  });

  // * Start Apollo
  await server.start();

  // * Middleware
  server.applyMiddleware({ app });

  // * Serve client
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist")));
    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(__dirname, "../", "client", "dist", "index.html")
      );
    });
  } else {
    app.get("/", (req, res) => {
      res.send("Please run npm run dist");
    });
  }

  // * Listner
  app.listen(PORT, () => console.log(`Server runing on port ${PORT} `));

  // * DB config
  mongoose.connect(process.env.MONGO_DB_URI || "", () =>
    console.log("Mongo DB connected")
  );
})();
