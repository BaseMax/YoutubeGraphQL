import { Field, InputType } from "@nestjs/graphql";
import { IsEAN, IsEmail, IsString } from "class-validator";

@InputType()
export class loginDto {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @IsString()
  password: string;
}
