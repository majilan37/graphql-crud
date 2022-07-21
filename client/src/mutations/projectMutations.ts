import { gql } from "@apollo/client";

export const DELETE_PROJECT = gql`
  mutation ($id: String!) {
    deleteProject(input: { _id: $id }) {
      _id
      name
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation (
    $name: String!
    $description: String!
    $status: status!
    $client: String!
  ) {
    createProject(
      input: {
        name: $name
        description: $description
        status: $status
        client: $client
      }
    ) {
      _id
      name
      description
      status
      client {
        _id
        name
      }
    }
  }
`;

export const UPDATE_PROJECT = gql`
  mutation (
    $id: String!
    $name: String
    $description: String
    $status: status
    $client: String
  ) {
    updateProject(
      input: {
        _id: $id
        name: $name
        description: $description
        status: $status
        client: $client
      }
    ) {
      name
      description
      status
    }
  }
`;
