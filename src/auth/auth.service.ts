import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
} from "@nestjs/common";
import { SignupInput } from "./dto/signup.dto";
import { Collection, Db } from "mongodb";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt.payload";
import { ConfigService } from "@nestjs/config";
import { AuthenticatedPayload } from "./entities/auth.entity";
import * as argon2 from "argon2";
import { LoginInput } from "./dto/login.dto";

@Injectable()
export class AuthService {
  private collection: Collection;

  constructor(
    @Inject("DATABASE_CONNECTION") db: Db,
    private readonly jwtService: JwtService
  ) {
    this.collection = db.collection("users");
  }

  async signup(signUpDto: SignupInput): Promise<AuthenticatedPayload> {
    const userExists = await this.findByEmail(signUpDto.email);

    if (userExists) {

      throw new HttpException("an account exists with this email", 404);
    }

    const userData = {
      name: signUpDto.name,
      email: signUpDto.email,
      password: await argon2.hash(signUpDto.password),
    };
    const user = await this.collection.insertOne(userData);
    const token = this.getToken({
      sub: user.insertedId,
      name: signUpDto.name,
    });

    return { name: signUpDto.name, token };
  }

  getToken(jwtPayload: JwtPayload): string {
    return this.jwtService.sign(jwtPayload);
  }

  async findByEmail(email: string) {
    return await this.collection.findOne(
      { email: email },
      { projection: { password: 0 } }
    );
  }

  async login(loginDto: LoginInput): Promise<AuthenticatedPayload> {
    const user = await this.findByEmailOrThrow(loginDto.email);

    const isValid = await argon2.verify(user.password, loginDto.password);

    if (!isValid) {
      throw new BadRequestException("the credentials aren't correct");
    }

    return {
      token: this.getToken({ sub: user._id, name: user.name }),
      name: user.name,
    };
  }

  async findByEmailOrThrow(email: string) {
    const options = {
      projection: { email: 1, password: 1, name: 1, _id: 1 },
    };

    const user = await this.collection.findOne(
      {
        email: email,
      },
      options
    );

    if (!user) {
      throw new BadRequestException("no");
    }

    return user;
  }
}
