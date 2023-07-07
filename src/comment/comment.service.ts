import { Inject, Injectable } from "@nestjs/common";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";
import { Collection, Db, ObjectId } from "mongodb";
import { VideoService } from "src/video/video.service";

@Injectable()
export class CommentService {
  private collection: Collection;

  constructor(
    @Inject("DATABASE_CONNECTION") db: Db,
    private readonly videoService: VideoService
  ) {
    this.collection = db.collection("comments");
  }

  async create(createCommentInput: CreateCommentInput) {
    const createdVideo = await this.collection.insertOne({
      videoId: new ObjectId(createCommentInput.videoId),
      commentMessage: createCommentInput.commentMessage,
    });
    return { id: createdVideo.insertedId };
  }

  findAll() {
    return `This action returns all comment`;
  }

  async findCommentsOfVideo(videoId: string) {
    return await this.collection
      .find({ videoId: new ObjectId(videoId) })
      .toArray();
  }

  update(id: number, updateCommentInput: UpdateCommentInput) {
    return `This action updates a #${id} comment`;
  }

  remove(id: number) {
    return `This action removes a #${id} comment`;
  }
}
