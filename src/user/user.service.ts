import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateUserInput } from "./dto/update-user.input";
import { Collection, Db, ObjectId } from "mongodb";

@Injectable()
export class UserService {
  collection: Collection;

  option: {
    projection: {
      email: 1;
      name: 1;
    };
  };
  constructor(@Inject("DATABASE_CONNECTION") Db: Db) {
    this.collection = Db.collection("users");
  }

  async findAll() {
    return await this.collection.find({}, this.option).toArray();
  }

  async findOne(id: string) {
    return await this.collection.findOne({ _id: new ObjectId(id) });
  }

  async update(userId: string, updateUserInput: UpdateUserInput) {
    const existingUser = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      { $set: updateUserInput }
    );

    return { id: existingUser.value._id };
  }

  async remove(id: string) {
    return await this.collection.findOneAndDelete({ _id: new ObjectId(id) });
  }
}
