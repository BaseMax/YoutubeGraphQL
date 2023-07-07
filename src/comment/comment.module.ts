import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentResolver } from "./comment.resolver";
import { DbModule } from "src/DB/db.module";
import { VideoModule } from "src/video/video.module";

@Module({
  imports: [DbModule, VideoModule],
  providers: [CommentResolver, CommentService],
})
export class CommentModule {}
