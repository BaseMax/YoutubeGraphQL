import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { ChannelService } from "./channel.service";
import { Channel, CreatedChannel } from "./entities/channel.entity";
import { CreateChannelInput } from "./dto/create-channel.input";

@Resolver(() => Channel)
export class ChannelResolver {
  constructor(private readonly channelService: ChannelService) {}

  @Mutation(() => CreatedChannel)
  async createChannel(
    @Args("createChannelInput") createChannelInput: CreateChannelInput
  ) {
    return await this.channelService.create(createChannelInput);
  }

  @Query(() => [Channel], { name: "getChannels" })
  findAll() {
    return this.channelService.findAll();
  }

  @Query(() => Channel, { name: "findChannel" })
  async findOne(@Args("id", { type: () => String }) id: string) {
    return this.channelService.findOne(id);
  }

  @Mutation(() => Channel)
  removeChannel(@Args("id", { type: () => String }) id: string) {
    return this.channelService.remove(id);
  }
}
