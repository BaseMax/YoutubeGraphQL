import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { AuthService } from "./auth.service";
import { AuthenticatedPayload } from "./entities/auth.entity";
import { SignupInput } from "./dto/signup.dto";
import { loginDto } from "./dto/login.dto";
import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "./guards/Auth.guard";

@Resolver(() => AuthenticatedPayload)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthenticatedPayload, { name: "signup" })
  async signup(@Args("signupDto") signupDto: SignupInput) {
    const user = await this.authService.signup(signupDto);

    return user;
  }

  
  @Mutation(() => AuthenticatedPayload, { name: "login" })
  async login(@Args("loginDto") loginDto: loginDto) {
    return await this.authService.login(loginDto);
  }
}
