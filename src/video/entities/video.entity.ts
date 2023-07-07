import { ObjectType, Field, Int, PartialType } from "@nestjs/graphql";
import { ObjectId } from "mongodb";
import { Comment } from "src/comment/entities/comment.entity";

@ObjectType()
export class Video {
  @Field()
  videoUrl: string;

  @Field(() => Int)
  countOfLikes: number;

  @Field()
  countOfDisLikes: number;

  @Field()
  description: string;

  @Field()
  userId: string;

  @Field(() => [Comment], { nullable: true })
  comments: Comment[];
}

@ObjectType()
export class CreatedVideo {
  @Field()
  id: string;
}

@ObjectType()
export class LikedVideo extends PartialType(CreatedVideo) {}
