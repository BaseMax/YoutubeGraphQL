import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CreateVideoInput } from "./dto/create-video.input";
import { Collection, Db, ObjectId } from "mongodb";
import { Video } from "./entities/video.entity";
import { CLASS_TYPE_METADATA } from "@nestjs/graphql";

@Injectable()
export class VideoService {
  private collection: Collection;
  constructor(@Inject("DATABASE_CONNECTION") db: Db) {
    this.collection = db.collection("videos");
  }

  options = {
    projection: {
      videoUrl: 1,
      countOfLikes: 1,
      countOfDisLikes: 1,
      description: 1,
      userId: 1,
    },
  };

  async create(createVideoInput: CreateVideoInput, userId: string) {
    const video = await this.collection.insertOne(
      {
        videoUrl: createVideoInput.videoLink,
        countOfLikes: 0,
        countOfDisLikes: 0,
        description: createVideoInput.description,
        userId: new ObjectId(userId),
      },
      {}
    );

    return { id: video.insertedId };
  }

  async findAll() {
    const res = await this.collection
      .aggregate([
        {
          $lookup: {
            from: "comments",
            localField: "_id",
            foreignField: "videoId",
            as: "comments",
          },
        },
      ])

      .toArray();

    console.log(res);

    return res;
  }

  async findOne(id: string) {
    return this.collection.findOne({ _id: new ObjectId(id) }, this.options);
  }

  async getTrendingVideos() {
    return await this.collection
      .aggregate([{ $sort: { countOfLikes: -1 } }])
      .toArray();
  }

  async validateVideoId(id: string) {
    const existsVideo = await this.collection.findOne({
      _id: new ObjectId(id),
    });

    if (!existsVideo) {
      throw new BadRequestException(
        "video with this credentials doesn't exist"
      );
    }

    return existsVideo;
  }

  async likeVideo(id: string) {
    const updatedVideo = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $inc: {
          countOfLikes: 1,
        },
      },
      this.options
    );

    return updatedVideo.value;
  }

  async disLikeVideo(id: string) {
    const updatedVideo = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $inc: { countOfDisLikes: 1 } },
      this.options
    );

    return updatedVideo.value;
  }
}
