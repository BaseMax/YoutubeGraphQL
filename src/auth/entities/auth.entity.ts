import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class AuthenticatedPayload {
  @Field()
  name: string;

  @Field()
  token: string;
}
