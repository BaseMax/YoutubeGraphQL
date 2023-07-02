import { InputType, Int, Field } from "@nestjs/graphql";
import { IsEmail, IsString, Validate } from "class-validator";
import { CustomMatchPasswords } from "src/common/password.decorators";

@InputType()
export class SignupInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  password: string;

  @Validate(CustomMatchPasswords, ["password"])
  @Field()
  confirmPassword: string;
}
