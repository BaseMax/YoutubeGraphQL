// import { Module } from "@nestjs/common";
// import { AuthService } from "./auth.service";
// import { AuthResolver } from "./auth.resolver";
// import { DbModule } from "src/DB/db.module";
// import { JwtModule, JwtService } from "@nestjs/jwt";
// import { ConfigService } from "@nestjs/config";
// import { AuthGuard, PassportModule } from "@nestjs/passport";
// import { JwtAuthGuard } from "./guards/Auth.guard";
// // import { UserModule } from "src/user/user.module";

// @Module({
//   imports: [
//     JwtModule.registerAsync({
//       useFactory: (configService: ConfigService) => ({
//         global: true,
//         secret: configService.get("SECRET"),
//         signOptions: { expiresIn: "1d" },
//       }),
//       inject: [ConfigService],
//     }),

//     DbModule,
//   ],
//   providers: [,AuthResolver, AuthService,],
//   exports: [
//     JwtAuthGuard,
//     JwtModule.registerAsync({
//       useFactory: (configService: ConfigService) => ({
//         global: true,
//         secret: configService.get("SECRET"),
//         signOptions: { expiresIn: "1d" },
//       }),
//       inject: [ConfigService],
//     }),
//     JwtService,
//   ],
// })
// export class AuthModule {}

import { Module, forwardRef } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";
import { DbModule } from "src/DB/db.module";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { AuthGuard, PassportModule } from "@nestjs/passport";
import { JwtAuthGuard } from "./guards/Auth.guard";

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get("SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
      inject: [ConfigService],
    }),

    DbModule,
  ],
  providers: [AuthResolver, AuthService],
  exports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        global: true,
        secret: configService.get("SECRET"),
        signOptions: { expiresIn: "1d" },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}
