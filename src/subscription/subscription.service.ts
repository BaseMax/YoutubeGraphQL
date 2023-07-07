import { Inject, Injectable } from "@nestjs/common";
import { CreateSubscriptionInput } from "./dto/create-subscription.input";
import { Collection, Db, ObjectId } from "mongodb";

@Injectable()
export class SubscriptionService {
  collection: Collection;
  constructor(@Inject("DATABASE_CONNECTION") db: Db) {
    this.collection = db.collection("subscriptions");
  }
  async create(
    createSubscriptionInput: CreateSubscriptionInput,
    userId: string
  ) {
    const subscriptions = await this.collection.insertOne({
      channelId: new ObjectId(createSubscriptionInput.channelId),
      userId: new ObjectId(userId),
    });

    return { id: subscriptions.insertedId };
  }

  async findAll() {
    return await this.collection.find({});
  }

  async findOne(userId: string) {
    return await this.collection
      .aggregate([
        {
          $match: { userId: new ObjectId(userId) },
        },
        {
          $lookup: {
            from: "channels",
            localField: "channelId",
            foreignField: "_id",
            as: "channel",
          },
        },
        {
          $unwind: "$channel",
        },
      ])
      .toArray();
  }
}
