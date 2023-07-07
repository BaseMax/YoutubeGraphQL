import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserResolver } from "./user.resolver";
import { DbModule } from "src/DB/db.module";
import { AuthModule } from "src/auth/auth.module";

@Module({
  imports: [DbModule,AuthModule,],
  providers: [UserResolver, UserService],
  exports: [],
})
export class UserModule {}
