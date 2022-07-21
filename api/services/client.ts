import {
  ClientModel,
  CreateClientInput,
  DeleteClientInput,
} from "../schema/client";
import { ApolloError } from "apollo-server";

class ClientService {
  async getClient() {
    return ClientModel.find();
  }

  async deleteClient(input: DeleteClientInput) {
    const client = await ClientModel.findById(input._id);

    if (!client) {
      throw new ApolloError("Client Not Found");
    }

    client.deleteOne();

    return client;
  }

  async createClient(input: CreateClientInput) {
    const client = await ClientModel.findOne({ email: input.email });
    if (client) {
      throw new ApolloError("Client already exists");
    }
    return ClientModel.create(input);
  }
}

export default ClientService;
