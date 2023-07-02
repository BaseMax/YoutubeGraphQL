import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";

import { join } from "path";
import { GraphQLError, GraphQLFormattedError } from "graphql";
import { DbModule } from "./DB/db.module";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      formatError: (error: GraphQLError) => {
        const graphQLFormattedError: GraphQLFormattedError = {
          message:
            (error?.extensions?.exception as any)?.response?.message ||
            error?.message,
        };
        return graphQLFormattedError;
      },
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    DbModule,
    AuthModule,
  ],

  controllers: [],
  providers: [],
})
export class AppModule {}
