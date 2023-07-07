import { InputType, Int, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateCommentInput {
  @Field()
  @IsString()
  videoId: string;

  @Field()
  @IsString()
  commentMessage: string;



}


