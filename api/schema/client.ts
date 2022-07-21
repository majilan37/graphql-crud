import { Field, InputType, ObjectType } from "type-graphql";
import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail } from "class-validator";

@ObjectType()
export class Client {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({ required: true })
  name: string;

  @Field(() => String)
  @prop({ required: true, unique: true })
  email: string;

  @Field(() => String)
  @prop({ required: true })
  phone: string;
}

export const ClientModel = getModelForClass(Client);

// * Inputs
@InputType()
export class CreateClientInput {
  @Field(() => String)
  name: string;

  @IsEmail()
  @Field(() => String)
  email: string;

  @Field(() => String)
  phone: string;
}

@InputType()
export class DeleteClientInput {
  @Field(() => String)
  _id: string;
}
