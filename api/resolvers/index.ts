import ClientResolver from "./client";
import ProjectResolver from "./project";

export const resolvers = [ClientResolver, ProjectResolver] as const;
