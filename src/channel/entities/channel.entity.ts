import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Channel {
  @Field()
  name: string;

  @Field()
  _id: string;
}

@ObjectType()
export class CreatedChannel {
  @Field()
  id: string;
}
