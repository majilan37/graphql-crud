import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateProjectInput,
  DeleteOrGetProjectInput,
  Project,
  UpdateProjectInput,
} from "../schema/project";
import ProjectService from "../services/project";
import { Client } from "../schema/client";

@Resolver(() => Project)
export default class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {
    this.projectService = new ProjectService();
  }

  @Query(() => [Project])
  getProjects() {
    return this.projectService.getProjects();
  }

  @Query(() => Project)
  getProject(@Arg("input") input: DeleteOrGetProjectInput) {
    return this.projectService.getProject(input);
  }

  @Mutation(() => Project)
  createProject(@Arg("input") input: CreateProjectInput) {
    return this.projectService.createProject(input);
  }

  @Mutation(() => Project)
  deleteProject(@Arg("input") input: DeleteOrGetProjectInput) {
    return this.projectService.deleteProject(input);
  }

  @Mutation(() => Project)
  updateProject(@Arg("input") input: UpdateProjectInput) {
    return this.projectService.updateProject(input);
  }
}
