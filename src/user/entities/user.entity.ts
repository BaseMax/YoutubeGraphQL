import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class User {

  
  @Field()
  name: string

  @Field()
  email: string
}

@ObjectType()
export class UpdatedUser {
  @Field()
  id: string;
}
