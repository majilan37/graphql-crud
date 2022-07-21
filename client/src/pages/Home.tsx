import { useMutation, useQuery } from "@apollo/client";
import { useMemo } from "react";
import Clients from "../components/Clients";
import Header from "../components/Header";
import Modal from "../components/Modal";
import Projects from "../components/Projects";
import { CREATE_CLIENT } from "../mutations/clientMutations";
import { CREATE_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { GET_PROJECTS } from "../queries/projectQueries";
import { Client, Project } from "../types";

type ClientData = { getClients: Client[] };

function Home() {
  // * Apollo Mutation hooks
  const [createClient, { loading: createClientLoading }] = useMutation<{
    createClient: Client;
  }>(CREATE_CLIENT, {
    // update the cache
    update(cache, { data }) {
      const client = data?.createClient;
      const { getClients } = cache.readQuery<ClientData>({
        query: GET_CLIENTS,
      })!;

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { getClients: getClients.concat([client!]) },
      });
    },
  });

  const [createProject, { loading: createProjectLoading }] = useMutation<{
    createProject: Project;
  }>(CREATE_PROJECT, {
    update(cache, { data }) {
      const project = data?.createProject;
      const { getProjects } = cache.readQuery<{ getProjects: Project[] }>({
        query: GET_PROJECTS,
      })!;

      cache.writeQuery({
        query: GET_PROJECTS,
        data: { getProjects: [...getProjects, project] },
      });
    },
  });

  const { data } = useQuery<{ getClients: Client[] }>(GET_CLIENTS);

  const clients = useMemo(() => {
    return data?.getClients.map((client) => ({
      value: client._id,
      text: client.name,
    }));
  }, [data]);

  return (
    <div>
      <Header />
      <div className="max-w-7xl mx-auto space-y-3 py-7 !pb-14">
        <div className="my-3">
          <Modal
            formArr={[
              { name: "name", type: "text", label: "Name" },
              { name: "email", type: "email", label: "Email" },
              { name: "phone", type: "text", label: "Phone" },
            ]}
            keyItem="name"
            buttonText="Add Client"
            buttonStyle="add_client_button"
            onSubmit={async (data) =>
              await createClient({ variables: { ...data } })
            }
            loading={createClientLoading}
          />
          <Modal
            formArr={[
              { name: "name", type: "text", label: "Name" },
              {
                name: "description",
                type: "text",
                label: "Description",
                textArea: true,
              },
              {
                name: "status",
                type: "text",
                label: "Status",
                title: "Select status",
                select: true,
                options: [
                  { value: "new", text: "Not started" },
                  { value: "inProgress", text: "In progress" },
                  { value: "finished", text: "Finished" },
                ],
              },
              {
                name: "client",
                type: "text",
                label: "Client",
                title: "Select client",
                select: true,
                options: clients ?? [],
              },
            ]}
            keyItem="name"
            buttonText="Add Project"
            buttonStyle="add_project_button"
            loading={createProjectLoading}
            onSubmit={async (data) => await createProject({ variables: data })}
          />
        </div>
        <Clients />
        <Projects />
      </div>
    </div>
  );
}

export default Home;
