import { Module } from "@nestjs/common";
import { ChannelService } from "./channel.service";
import { ChannelResolver } from "./channel.resolver";
import { DbModule } from "src/DB/db.module";

@Module({
  imports: [DbModule],
  providers: [ChannelResolver, ChannelService],
})
export class ChannelModule {}
