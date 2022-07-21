import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Client, CreateClientInput, DeleteClientInput } from "../schema/client";
import ClientService from "../services/client";

@Resolver(() => Client)
export default class ClientResolver {
  constructor(private readonly clientService: ClientService) {
    this.clientService = new ClientService();
  }
  @Query(() => [Client])
  getClients() {
    return this.clientService.getClient();
  }

  @Mutation(() => Client)
  deleteClient(@Arg("input") input: DeleteClientInput) {
    return this.clientService.deleteClient(input);
  }

  @Mutation(() => Client)
  createClient(@Arg("input") input: CreateClientInput) {
    return this.clientService.createClient(input);
  }
}
