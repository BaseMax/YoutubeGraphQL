import { InputType, Int, Field } from "@nestjs/graphql";
import { IsString } from "class-validator";

@InputType()
export class CreateSubscriptionInput {
  @Field()
  @IsString()
  channelId: string;
}
