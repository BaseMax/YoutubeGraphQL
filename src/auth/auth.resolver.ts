import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthenticatedPayload } from "./entities/auth.entity";
import { SignupInput } from "./dto/signup.dto";
import { UpdateAuthInput } from "./dto/update-auth.input";

@Resolver(() => AuthenticatedPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthenticatedPayload, { name: "signup" })
  async signup(@Args("signupDto") createAuthInput: SignupInput) {
    const user = await this.authService.create(createAuthInput);
    console.log(user);

    return user;
  }

  @Query(() => [AuthenticatedPayload], { name: "auth" })
  findAll() {
    return this.authService.findAll();
  }

  
}
