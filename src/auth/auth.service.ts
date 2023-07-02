import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SignupInput } from "./dto/signup.dto";
import { UpdateAuthInput } from "./dto/update-auth.input";
import { Collection, Db } from "mongodb";
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt.payload";
import { ConfigService } from "@nestjs/config";
import { AuthenticatedPayload } from "./entities/auth.entity";
import * as argon2 from "argon2";

@Injectable()
export class AuthService {
  private collection: Collection;

  constructor(
    @Inject("DATABASE_CONNECTION") db: Db,
    private readonly jwtService: JwtService
  ) {
    this.collection = db.collection("users");
  }

  async create(signUpDto: SignupInput): Promise<AuthenticatedPayload> {
    const userData = {
      name: signUpDto.name,
      email: signUpDto.email,
      password: argon2.hash(signUpDto.password),
    };
    const user = await this.collection.insertOne(userData);
    const token = this.getToken({ sub: user.insertedId, name: signUpDto.name });

    return { name: signUpDto.name, token };
  }

  getToken(jwtPayload: JwtPayload): string {
    return this.jwtService.sign(jwtPayload);
  }

  findAll() {
    return `This action returns all auth`;
  }

  async findByEmailOrThrow(email: string) {
    const user = await this.collection.findOne({ email: email });

    if (!user) {
      throw new BadRequestException("no");
    }
    return user;
  }

  // async login ( )
}
