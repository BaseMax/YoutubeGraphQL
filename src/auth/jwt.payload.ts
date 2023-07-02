import { ObjectId } from "mongodb";
export type JwtPayload = {
  sub: ObjectId;
  name: string;

  
};
