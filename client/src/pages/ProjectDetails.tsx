import { Link, useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECT, GET_PROJECTS } from "../queries/projectQueries";
import Spinner from "./../components/Spinner";

import { DELETE_PROJECT, UPDATE_PROJECT } from "../mutations/projectMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import Header from "../components/Header";
import { Project as ProjectType, Client } from "../types";
import Modal from "../components/Modal";
import { useMemo } from "react";

function Project() {
  const { id } = useParams();
  const navigate = useNavigate();

  // * Apollo Query hooks
  const { data, loading, error } = useQuery<{ getProject: ProjectType }>(
    GET_PROJECT,
    { variables: { id } }
  );

  const { data: clientsData } = useQuery<{ getClients: Client[] }>(GET_CLIENTS);

  // * Apollo Mutation hooks
  const [deleteProject, { loading: deleteProjectLoading }] = useMutation<
    { deleteProject: ProjectType },
    { id: string }
  >(DELETE_PROJECT, {
    variables: { id: id! },
    onCompleted: () => navigate("/"),
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const [updateProject, { loading: updateProjectLoading }] = useMutation(
    UPDATE_PROJECT,
    {
      refetchQueries: [{ query: GET_PROJECTS }],
      onCompleted: () => navigate("/"),
    }
  );

  const clients = useMemo(() => {
    return clientsData?.getClients.map((client) => ({
      value: client._id,
      text: client.name,
    }));
  }, [clientsData]);

  return (
    <>
      <Header />
      <div className="max-w-7xl py-10 mx-auto">
        <div className="p-6 max-w-sm bg-white mx-auto rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
          {loading ? (
            <div className="flex justify-center">
              <Spinner size="w-14 h-14 mx-auto" />
            </div>
          ) : (
            <>
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data?.getProject.name}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {data?.getProject.description}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {data?.getProject.status === "new"
                  ? "Not Started"
                  : data?.getProject.status === "inProgress"
                  ? "In progress"
                  : "Finished"}
              </p>
              <div className="flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Go Back
                </Link>
                <button
                  disabled={deleteProjectLoading}
                  onClick={() => deleteProject()}
                  type="button"
                  className={`text-white flex bg-gradient-to-r from-red-400 via-red-500 to-red-600 mx-2 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2 text-center  `}>
                  {deleteProjectLoading && <Spinner size="w-4 h-4" />}
                  <span>Delete</span>
                </button>
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
                  buttonText="Update"
                  buttonStyle="update_project_button"
                  loading={updateProjectLoading}
                  data={data?.getProject}
                  onSubmit={async (data) =>
                    await updateProject({ variables: { id, ...data } })
                  }
                />
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Project;
