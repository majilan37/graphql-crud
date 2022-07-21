import { ApolloError } from "apollo-server";
import { UpdateProjectInput } from "../schema/project";
import { Client, ClientModel } from "../schema/client";
import {
  CreateProjectInput,
  DeleteOrGetProjectInput,
  ProjectModel,
} from "../schema/project";

class ProjectService {
  async createProject(input: CreateProjectInput) {
    const project = await ProjectModel.create(input);
    const client = await ClientModel.findOne({ _id: project.client });
    // @ts-ignore
    project.client = client as Client;
    return project;
  }

  async getProjects() {
    const projects = await ProjectModel.find().lean();
    for await (const project of projects) {
      project.client =
        (await ClientModel.findOne({ _id: project.client })) ?? "";
    }

    return projects;
    // return projects.map(async (project) => ({
    //   ...project,
    //   client: await ClientModel.findOne({ client: project.client }),
    // }));
  }

  async getProject(input: DeleteOrGetProjectInput) {
    const project = await ProjectModel.findById(input._id).lean();
    const client = await ClientModel.findOne({
      _id: project?.client,
    }).lean();
    return { ...project, client };
  }

  async deleteProject(input: DeleteOrGetProjectInput) {
    const project = await ProjectModel.findById(input._id);

    if (!project) {
      throw new ApolloError("Project not found");
    }

    await project.deleteOne();

    return project;
  }

  async updateProject({ _id, ...rest }: UpdateProjectInput) {
    const project = await ProjectModel.findById(_id);
    if (!project) {
      throw new ApolloError("Project not found");
    }

    await project.updateOne({ $set: { ...rest } });

    return project;
  }
}

export default ProjectService;
