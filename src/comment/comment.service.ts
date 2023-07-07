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

  async findCommentsOfVideo(videoId: string) {
    return await this.collection
      .find({ videoId: new ObjectId(videoId) })
      .toArray();
  }

  

  async remove(id: string) {
    return await this.collection.findOneAndDelete({ _id: new ObjectId(id) });
  }
}
