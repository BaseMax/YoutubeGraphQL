import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongoClient, Db } from "mongodb";

@Module({
  providers: [
    {
      provide: "DATABASE_CONNECTION",
      useFactory: async (config: ConfigService): Promise<Db> => {
        try {
          const client = await MongoClient.connect(
            config.getOrThrow("DATABASE_URL")
          );

          const db = client.db();

          return db;
        } catch (e) {
          throw e;
        }
      },
      inject: [ConfigService],
    },
  ],
  exports: ["DATABASE_CONNECTION"],
})
export class DbModule {}
