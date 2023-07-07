import { ObjectType, Field, Int } from "@nestjs/graphql";
import { Channel } from "src/channel/entities/channel.entity";

@ObjectType()
export class Subscription {
  @Field()
  _id: string;

  @Field()
  userId: string;

  @Field()
  channelId: string;

  @Field(() => Channel)
  channel: Channel;
}

export class CreatedSubscription {
  @Field()
  _id: string;
}
