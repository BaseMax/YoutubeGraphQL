import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateChannelInput } from "./dto/create-channel.input";
import { UpdateChannelInput } from "./dto/update-channel.input";
import { Collection, Db, ObjectId } from "mongodb";

@Injectable()
export class ChannelService {
  collection: Collection;
  option = {
    projection: {
      name: 1,
      _id: 1,
    },
  };
  constructor(@Inject("DATABASE_CONNECTION") db: Db) {
    this.collection = db.collection("channels");
  }

  async create(createChannelInput: CreateChannelInput) {
    const channel = await this.collection.insertOne({
      name: createChannelInput.name,
    });

    return { id: channel.insertedId };
  }

  async findAll() {
    return await this.collection.find({}).toArray();
  }

  async validateChannel(name: string) {
    const channel = await this.collection
      .find({ name: name }, this.option)

      .toArray();

    if (!channel)
      throw new HttpException(
        "there is no channel with this credentials",
        HttpStatus.CONFLICT
      );

    return channel;
  }

  async findOne(id: string) {
    return await this.collection.findOne(
      { _id: new ObjectId(id) },
      this.option
    );
  }

  async subscribeChannel(name: string, userId: string) {
    return await this.collection.findOneAndDelete({ name: name }, {});
  }


  async remove(id: string) {
    return await this.collection.findOneAndDelete(
      { _id: new ObjectId(id) },
      {}
    );
  }
}
