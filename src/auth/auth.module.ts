import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { DbModule } from "src/DB/db.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,

        secret: configService.get("SECRET"),
        signOptions: { expiresIn: "20m" },
      }),
      inject: [ConfigService],
    }),
    DbModule,
  ],
  providers: [AuthResolver, AuthService],
})
export class AuthModule {}
