import { ObjectType, Field, Int } from "@nestjs/graphql";

@ObjectType()
export class Comment {
  @Field()
  _id: string;

  @Field()
  commentMessage: string;

  @Field()
  videoId: string;
}

@ObjectType()
export class CreatedComment {
  @Field()
  id: string;
}
