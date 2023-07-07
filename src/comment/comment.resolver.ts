import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { CommentService } from "./comment.service";
import { Comment, CreatedComment } from "./entities/comment.entity";
import { CreateCommentInput } from "./dto/create-comment.input";
import { UpdateCommentInput } from "./dto/update-comment.input";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Mutation(() => CreatedComment)
  createComment(
    @Args("createCommentInput") createCommentInput: CreateCommentInput
  ) {
    return this.commentService.create(createCommentInput);
  }

  
  @Query(() => [Comment], { name: "videoComments" })
  async getVideoComments(@Args("id") id: string) {
    return await this.commentService.findCommentsOfVideo(id);
  }

  @Mutation(() => Comment)
  async removeComment(@Args("id", { type: () => String }) id: string) {
    return await this.commentService.remove(id);
  }
}
