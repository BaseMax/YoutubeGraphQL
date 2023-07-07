import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { UserService } from "./user.service";
import { UpdatedUser, User } from "./entities/user.entity";
import { UpdateUserInput } from "./dto/update-user.input";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/guards/Auth.guard";
import { GetCurrentUserId } from "src/common/get-current-userId";

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: "findAllUsers" })
  async findAll() {
    const res = await this.userService.findAll();
    console.log(res);
    return res;
  }

  @Query(() => User, { name: "findUserById" })
  async findOne(@Args("id", { type: () => String }) id: string) {
    return await this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UpdatedUser)
  async updateUser(
    @Args("updateUserInput") updateUserInput: UpdateUserInput,
    @GetCurrentUserId() userId: string
  ) {
    return this.userService.update(userId, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@GetCurrentUserId() userId: string) {
    return this.userService.remove(userId);
  }
}
