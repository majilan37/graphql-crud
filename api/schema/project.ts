import { Field, InputType, ObjectType, registerEnumType } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { Client } from "./client";

enum Status {
  new = "Not Started",
  inProgress = "In progress",
  finished = "Finished",
}

registerEnumType(Status, {
  name: "status",
});

@ObjectType()
export class Project {
  @Field(() => String)
  _id: string;

  @Field(() => Client, {})
  @prop({ ref: () => Client, required: true })
  client: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String, { nullable: true })
  @prop()
  description: string;

  @Field(() => Status)
  @prop({ default: Status.new })
  status: Status;
}

export const ProjectModel = getModelForClass(Project);

// * Create project
@InputType()
export class CreateProjectInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => Status)
  status: Status;

  @Field(() => String)
  client: string;
}

// * Delete project
@InputType()
export class DeleteOrGetProjectInput {
  @Field(() => String)
  _id: string;
}

// * Update project
@InputType()
export class UpdateProjectInput {
  @Field(() => String)
  _id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Status, { nullable: true })
  status: Status;

  @Field(() => String, { nullable: true })
  client: string;
}
