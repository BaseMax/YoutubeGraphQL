import { Module } from "@nestjs/common";
import { VideoService } from "./video.service";
import { VideoResolver } from "./video.resolver";
import { DbModule } from "src/DB/db.module";
import { JwtModule } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
@Module({
  imports: [DbModule, AuthModule],
  providers: [VideoResolver, VideoService],
  exports: [VideoService],
})
export class VideoModule {}
