import { gql } from "@apollo/client";

export const GET_CLIENTS = gql`
  query {
    getClients {
      _id
      name
      email
      phone
    }
  }
`;
