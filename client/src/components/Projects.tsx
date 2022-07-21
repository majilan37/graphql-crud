import { useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { Project } from "../types";
import Table from "./Table";
import { Link } from "react-router-dom";

function Projects() {
  const { data, loading } = useQuery<{
    getProjects: Project[];
  }>(GET_PROJECTS);
  return (
    <>
      <Table
        title="Projects"
        tbody={data?.getProjects ?? []}
        loading={loading}
        theader={["Name", "Description", "Status", "Client"]}
        keyItem="name"
        render={(item) => (
          <>
            <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-[80px] ">
              {item.name}
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {item.description}
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {item.status === "new"
                ? "Not Started"
                : item.status === "inProgress"
                ? "In progress"
                : "Finished"}
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {item.client.name}
            </th>
            <td className="px-6 py-4 text-right space-x-2 ">
              <Link
                to={`/projects/${item._id}`}
                className="font-medium text-green-600 dark:text-green-500 hover:underline">
                View
              </Link>
            </td>
          </>
        )}
      />
    </>
  );
}

export default Projects;
