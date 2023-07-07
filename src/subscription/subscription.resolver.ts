import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { SubscriptionService } from "./subscription.service";
import { Subscription } from "./entities/subscription.entity";
import { CreateSubscriptionInput } from "./dto/create-subscription.input";
import { UpdateSubscriptionInput } from "./dto/update-subscription.input";
import { CreatedChannel } from "src/channel/entities/channel.entity";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/Auth.guard";
import { GetCurrentUserId } from "src/common/get-current-userId";

@Resolver(() => Subscription)
export class SubscriptionResolver {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreatedChannel, { name: "subscribeChannel" })
  subscribe(
    @Args("subscribeInput")
    createSubscriptionInput: CreateSubscriptionInput,
    @GetCurrentUserId() userId: string
  ) {
    return this.subscriptionService.create(createSubscriptionInput, userId);
  }

  @Query(() => [Subscription], { name: "subscription" })
  getAllUsersAndSubscription() {
    return this.subscriptionService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Subscription], { name: "getAllSubscribedChannel" })
  async findUserSubscription(@GetCurrentUserId() userId: string) {
    return await this.subscriptionService.findOne(userId);
  }
}
