import { useMutation, useQuery } from "@apollo/client";
import { DELETE_CLIENT } from "../mutations/clientMutations";
import { GET_CLIENTS } from "../queries/clientQueries";
import { Client } from "../types";
import Spinner from "./Spinner";
import Table from "./Table";

type ClientData = { getClients: Client[] };

function Clients() {
  // * Apollo Query hooks
  const { data, loading } = useQuery<ClientData>(GET_CLIENTS);

  // * Apollo Mutation hooks
  const [deleteClient, { loading: deleteClientLoading }] = useMutation<{
    deleteClient: Client;
  }>(DELETE_CLIENT, {
    update(cache, { data }) {
      const id = data?.deleteClient._id;
      const { getClients } = cache.readQuery<ClientData>({
        query: GET_CLIENTS,
      })!;

      cache.writeQuery({
        query: GET_CLIENTS,
        data: { getClients: getClients.filter((client) => client._id !== id) },
      });
    },
  });
  return (
    <>
      <Table
        title="Clients"
        tbody={data?.getClients ?? []}
        loading={loading}
        theader={["Name", "Email", "Phone"]}
        keyItem="name"
        render={(item) => (
          <>
            <td className="px-6 py-4 font-medium text-gray-900 truncate max-w-[80px] ">
              {item.name}
            </td>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {item.email}
            </th>
            <th
              scope="row"
              className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
              {item.phone}
            </th>
            <td className="px-6 py-4 text-right space-x-2 ">
              <button
                onClick={() => deleteClient({ variables: { id: item._id } })}
                className="font-medium flex items-center gap-1  ml-auto text-red-600 dark:text-red-500 hover:underline">
                {deleteClientLoading && <Spinner size="w-2 h-2" />}{" "}
                <span>Delete</span>
              </button>
            </td>
          </>
        )}
      />
    </>
  );
}

export default Clients;
