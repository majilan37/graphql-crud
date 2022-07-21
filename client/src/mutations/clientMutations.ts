import { gql } from "@apollo/client";

export const CREATE_CLIENT = gql`
  mutation ($name: String!, $email: String!, $phone: String!) {
    createClient(input: { name: $name, email: $email, phone: $phone }) {
      _id
      name
      email
      phone
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation ($id: String!) {
    deleteClient(input: { _id: $id }) {
      _id
    }
  }
`;
