import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from "@apollo/client";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        getClients: {
          merge(existing, incoming) {
            return incoming;
          },
        },

        getProjects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});


const client = new ApolloClient({
  uri: "/graphql",
  cache,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </BrowserRouter>
  </React.StrictMode>
);
