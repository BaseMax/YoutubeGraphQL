import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { VideoService } from "./video.service";
import { CreatedVideo, LikedVideo, Video } from "./entities/video.entity";
import { CreateVideoInput } from "./dto/create-video.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/Auth.guard";
import { GetCurrentUserId } from "src/common/get-current-userId";

@Resolver(() => Video)
export class VideoResolver {
  constructor(private readonly videoService: VideoService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CreatedVideo)
  async createVideo(
    @Args("createVideoInput") createVideoInput: CreateVideoInput,
    @GetCurrentUserId() userId: string
  ) {
    const res = await this.videoService.create(createVideoInput, userId);
    console.log(res);
    return res;
  }

  @Query(() => [Video], { name: "allVideos" })
  async findAll() {
    const res = await this.videoService.findAll();
    return res;
  }

  @Query(() => Video, { name: "videoById" })
  findOne(@Args("id", { type: () => String }) id: string) {
    return this.videoService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Video, { name: "likeVideo" })
  async likeVideo(@Args("id", { type: () => String }) id: string) {
    return await this.videoService.likeVideo(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Video, { name: "dislikeVideo" })
  async disLikeVideo(@Args("id", { type: () => String }) id: string) {
    return await this.videoService.disLikeVideo(id);
  }

  @Query(() => [Video], { name: "findTrendingVideos" })
  async findTrendingVideos() {
    console.log("here");

    return await this.videoService.getTrendingVideos();
  }
}
