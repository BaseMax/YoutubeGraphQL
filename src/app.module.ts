import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import { join } from "path";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { DbModule } from "./DB/db.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { VideoModule } from "./video/video.module";
import { CommentModule } from "./comment/comment.module";
import { ChannelModule } from "./channel/channel.module";
import { SubscriptionModule } from "./subscription/subscription.module";
import { UserModule } from "./user/user.module";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    AuthModule,
    VideoModule,
    CommentModule,
    ChannelModule,
    SubscriptionModule,
    UserModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
