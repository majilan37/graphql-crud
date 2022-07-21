import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  query {
    getProjects {
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

export const GET_PROJECT = gql`
  query ($id: String!) {
    getProject(input: { _id: $id }) {
      _id
      name
      status
      description
      client {
        _id
        name
      }
    }
  }
`;
