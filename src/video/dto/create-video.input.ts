import { InputType, Int, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateVideoInput {
  @IsString()
  @Field()
  videoLink: string;

  @IsString()
  @Field()
  description: string;

}
